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

  async initializeStorage(): Promise<string | null> {
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
      return tx;
    } catch (e) {
      const anchorError = e as AnchorError;
      console.log("initializeStorage error:\n", anchorError.logs);
      return null;
    }
  }

  async initializeProfile(
    handle: string,
    uriProfile: string,
    uriFollowMint: string
  ): Promise<string | null> {
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
      return tx;
    } catch (error) {
      // console.log(error);
      const anchorError = error as AnchorError;
      console.log("initializeProfile error:\n", anchorError.logs);
      return null;
    }
  }

  async followProfile(
    followerProfilePDA: PublicKey,
    followedProfile: PublicKey
  ): Promise<string | null> {
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
          console.log(`${handle}: isFollowingProfile ATA Not Exist`);
          return null;
        }
      } catch (error) {}

      const destination = getAssociatedTokenAddressSync(followedMint, follower);

      const tx = await this.program.methods
        .followProfile()
        .accountsPartial({
          follower: follower,
          followerProfile: followerProfilePDA,
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
      return tx;
    } catch (error) {
      const anchorError = error as AnchorError;
      console.log("followProfile error:\n", anchorError.logs);
      return null;
    }
  }
}
