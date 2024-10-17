import {
  AnchorError,
  AnchorProvider,
  Program,
  Wallet,
  web3,
} from "@coral-xyz/anchor";
import {
  AccountInfo,
  ComputeBudgetProgram,
  Connection,
  PublicKey,
} from "@solana/web3.js";
import { OpenSocial } from "../idl/open_social";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { getMasterEdition, getMetadata } from "../util/utils";
import { TOKEN_METADATA_PROGRAM_ID } from "./constant";

const additionalComputeBudgetInstruction =
  ComputeBudgetProgram.setComputeUnitLimit({
    units: 300000,
  });

export enum FollowCondition {
  None,
  FollowHandle,
  FollowersNumber,
}

export type TxResult = {
  txHash: string | null;
  error: any | null;
};

export class OSPProgram {
  program: Program<OpenSocial>;

  constructor(idl: any, connection: Connection, wallet: Wallet) {
    const provider = new AnchorProvider(connection, wallet);
    const program = new Program(idl, provider);
    this.program = program;
  }

  async getSolBalance(account: PublicKey): Promise<number> {
    return await this.program.provider.connection.getBalance(account);
  }

  async getAccountInfo(
    account: PublicKey
  ): Promise<AccountInfo<Buffer> | null> {
    return await this.program.provider.connection.getAccountInfo(account);
  }

  async getStorageAccountInfo(account: PublicKey): Promise<Object | null> {
    try {
      return await this.program.account.ospStorage.fetch(account);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getProfileAccountInfo(account: PublicKey): Promise<Object | null> {
    try {
      return await this.program.account.profile.fetch(account);
    } catch (error) {
      console.log(`${account} not is profile account`);
      return null;
    }
  }

  async getCommunityAccountInfo(account: PublicKey): Promise<Object | null> {
    try {
      return await this.program.account.community.fetch(account);
    } catch (error) {
      console.log(`${account} not is community account`);
      return null;
    }
  }

  async getActivityAccountInfo(account: PublicKey): Promise<Object | null> {
    try {
      return await this.program.account.activity.fetch(account);
    } catch (error) {
      console.log(`${account} not is activity account`);
      return null;
    }
  }

  async getCommentAccountInfo(account: PublicKey): Promise<Object | null> {
    try {
      return await this.program.account.comment.fetch(account);
    } catch (error) {
      console.log(`${account} not is comment account`);
      return null;
    }
  }

  async getMegaphoneAccountInfo(account: PublicKey): Promise<Object | null> {
    try {
      return await this.program.account.megaphone.fetch(account);
    } catch (error) {
      console.log(`${account} not is megaphone account`);
      return null;
    }
  }

  getStoragePDA(): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("storage")],
      this.program.programId
    )[0];
  }

  getProfilePDA(handle: string): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("profile"), Buffer.from(handle)],
      this.program.programId
    )[0];
  }

  getProfileNFT(profilePDA: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("profile_nft"), profilePDA.toBytes()],
      this.program.programId
    )[0];
  }

  getProfileFollowMint(profilePDA: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("follow_mint"), profilePDA.toBytes()],
      this.program.programId
    )[0];
  }

  getCommunityPDA(handle: string): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("tribe"), Buffer.from(handle)],
      this.program.programId
    )[0];
  }

  getCommunityNFT(communityPDA: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("tribe_nft"), communityPDA.toBytes()],
      this.program.programId
    )[0];
  }
  getCommunityJoinMint(communityPDA: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("follow_mint"), communityPDA.toBytes()],
      this.program.programId
    )[0];
  }

  getCollectionPDA(seed: string): PublicKey {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("collection"), Buffer.from(seed)],
      this.program.programId
    )[0];
  }

  async initializeStorage(): Promise<TxResult> {
    const result: TxResult = {
      txHash: null,
      error: null,
    };
    try {
      const tx = await this.program.methods
        .initializeStorage()
        .accountsPartial({
          authority: this.program.provider.publicKey,
          ospStorage: this.getStoragePDA(),
          systemProgram: web3.SystemProgram.programId,
        })
        .rpc();
      await this.program.provider.connection.confirmTransaction(tx);
      result.txHash = tx;
      return result;
    } catch (error) {
      const anchorError = error as AnchorError;
      result.error = anchorError.error.errorMessage;
      return result;
    }
  }

  /**
   * Initialize a profile
   * @param handle
   * @param uriProfile
   * @param uriFollowMint
   * @returns
   */
  async initializeProfile(
    handle: string,
    uriProfile: string,
    uriFollowMint: string
  ): Promise<TxResult> {
    const result: TxResult = {
      txHash: null,
      error: null,
    };
    try {
      const profilePDA = this.getProfilePDA(handle);
      const profileNFT = this.getProfileNFT(profilePDA);
      const profileFollowMint = this.getProfileFollowMint(profilePDA);
      const destination = getAssociatedTokenAddressSync(
        profileNFT,
        this.program.provider.publicKey
      );
      const tx = await this.program.methods
        .initializeProfile(handle, uriProfile, uriFollowMint)
        .accountsPartial({
          user: this.program.provider.publicKey,
          storage: this.getStoragePDA(),
          profile: profilePDA,
          mint: profileNFT,
          collection: this.getCollectionPDA("profile"),
          destination: destination,
          metadata: getMetadata(profileNFT),
          edition: getMasterEdition(profileNFT),
          followMint: profileFollowMint,
          followMetadata: getMetadata(profileFollowMint),
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        })
        .preInstructions([additionalComputeBudgetInstruction])
        .rpc();

      await this.program.provider.connection.confirmTransaction(tx);
      result.txHash = tx;
      return result;
    } catch (error) {
      const anchorError = error as AnchorError;
      result.error = anchorError.error.errorMessage;
      return result;
    }
  }

  /**
   * Follow a profile
   * @param followerProfile
   * @param followedProfile
   * @returns
   */
  async followProfile(
    followerProfile: PublicKey,
    followedProfile: PublicKey
  ): Promise<TxResult> {
    const result: TxResult = {
      txHash: null,
      error: null,
    };
    try {
      const follower = this.program.provider.publicKey;

      const followedMint = this.getProfileFollowMint(followedProfile);

      const followedProfileAccountInfo = await this.getProfileAccountInfo(
        followedProfile
      );
      const remainingAccounts = [];

      try {
        const handle: string = JSON.parse(
          JSON.stringify(followedProfileAccountInfo)
        ).followCondition.isFollowing.handle;
        const isFollowingProfile = this.getProfilePDA(handle);
        const isFollowingProfileATA = getAssociatedTokenAddressSync(
          this.getProfileFollowMint(isFollowingProfile),
          follower
        );
        remainingAccounts.push({
          pubkey: isFollowingProfile,
          isSigner: false,
          isWritable: true,
        });
        remainingAccounts.push({
          pubkey: isFollowingProfileATA,
          isSigner: false,
          isWritable: true,
        });

        const isFollowingProfileATAAccountInfo = await this.getAccountInfo(
          isFollowingProfileATA
        );
        if (isFollowingProfileATAAccountInfo === null) {
          result.error = `${handle}: isFollowingProfile ATA Not Exist`;
          return result;
        }
      } catch (error) {}

      const destination = getAssociatedTokenAddressSync(followedMint, follower);

      const tx = await this.program.methods
        .followProfile()
        .accountsPartial({
          follower: follower,
          followerProfile: followerProfile,
          followedProfile: followedProfile,
          followMint: followedMint,
          destination: destination,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        })
        .preInstructions([additionalComputeBudgetInstruction])
        .remainingAccounts(remainingAccounts)
        .rpc();
      await this.program.provider.connection.confirmTransaction(tx);
      result.txHash = tx;
      return result;
    } catch (error) {
      const anchorError = error as AnchorError;
      result.error = anchorError.error.errorMessage;
      return result;
    }
  }

  /**
   *
   * @param profilePDA
   * @param followCondition
   * @param param handle or minimumFollowers
   * @returns
   */
  async setFollowConditions(
    profilePDA: PublicKey,
    followCondition: FollowCondition,
    param?: string | number
  ): Promise<TxResult> {
    const result: TxResult = {
      txHash: null,
      error: null,
    };
    const user = this.program.provider.publicKey;
    let followConditions = null;
    try {
      switch (followCondition) {
        case FollowCondition.None:
          break;
        case FollowCondition.FollowHandle:
          if (typeof param !== "string") {
            result.error = "Invalid param for FollowHandle";
            return result;
          }
          followConditions = { isFollowing: { handle: param } };
          break;
        case FollowCondition.FollowersNumber:
          if (typeof param !== "number") {
            result.error = "Invalid param for MinimumFollowers";
            return result;
          }
          followConditions = { minimumFollowers: { 0: param } };
        default:
          break;
      }

      const tx = await this.program.methods
        .setFollowConditions(followConditions)
        .accountsPartial({
          user: user,
          profile: profilePDA,
        })
        .rpc();
      await this.program.provider.connection.confirmTransaction(tx);
      result.txHash = tx;
      return result;
    } catch (error) {
      const anchorError = error as AnchorError;
      result.error = anchorError.error.errorMessage;
      return result;
    }
  }

  /**
   * Create a community
   * @param handle
   * @param uriCommunity
   * @param uriJoinMint
   * @param tags
   * @returns
   */
  async createCommunity(
    profilePDA: PublicKey,
    handle: string,
    uriCommunity: string,
    uriJoinMint: string,
    tags: string[] = []
  ): Promise<TxResult> {
    const result: TxResult = {
      txHash: null,
      error: null,
    };
    try {
      const storage = this.getStoragePDA();
      const user = this.program.provider.publicKey;
      const communityPDA = this.getCommunityPDA(handle);
      const communityNFT = this.getCommunityNFT(communityPDA);
      const communityJoinMint = this.getCommunityJoinMint(communityPDA);
      const destination = getAssociatedTokenAddressSync(communityNFT, user);
      const metadata = getMetadata(communityNFT);
      const edition = getMasterEdition(communityNFT);
      const joinMetadata = getMetadata(communityJoinMint);
      const userJoinAta = getAssociatedTokenAddressSync(
        communityJoinMint,
        user
      );

      const tx = await this.program.methods
        .createCommunity(handle, uriCommunity, uriJoinMint, tags)
        .accountsPartial({
          user: user,
          storage,
          profile: profilePDA,
          tribe: communityPDA,
          mint: communityNFT,
          collection: this.getCollectionPDA("community"),
          destination: destination,
          metadata: metadata,
          edition: edition,
          joinMint: communityJoinMint,
          joinMetadata: joinMetadata,
          userJoinAta: userJoinAta,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        })
        .preInstructions([additionalComputeBudgetInstruction])
        .rpc();
      await this.program.provider.connection.confirmTransaction(tx);
      result.txHash = tx;
      return result;
    } catch (error) {
      const anchorError = error as AnchorError;
      result.error = anchorError.error.errorMessage;
      return result;
    }
  }

  async joinCommunity(
    profilePDA: PublicKey,
    communityPDA: PublicKey
  ): Promise<TxResult> {
    const result: TxResult = {
      txHash: null,
      error: null,
    };
    try {
      const user = this.program.provider.publicKey;
      const communityFollowMint = this.getCommunityJoinMint(communityPDA);
      const userJoinAta = getAssociatedTokenAddressSync(
        communityFollowMint,
        user
      );
      const tx = await this.program.methods
        .joinTribe()
        .accountsPartial({
          user: user,
          profile: profilePDA,
          tribe: communityPDA,
          joinMint: communityFollowMint,
          profileAta: userJoinAta,
          systemProgram: web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        })
        .rpc();
      await this.program.provider.connection.confirmTransaction(tx);
      result.txHash = tx;
      return result;
    } catch (error) {
      const anchorError = error as AnchorError;
      result.error = anchorError.error.errorMessage;
      return result;
    }
  }
}
