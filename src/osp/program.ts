import {
  AnchorError,
  AnchorProvider,
  Program,
  Wallet,
  web3,
} from "@coral-xyz/anchor";
import { AccountInfo, Connection, PublicKey } from "@solana/web3.js";
import { OpenSocial } from "../idl/open_social";

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
      return tx;
    } catch (e) {
      const anchorError = e as AnchorError;
      console.log("error:\n", anchorError.logs);
      return null;
    }
  }
}
