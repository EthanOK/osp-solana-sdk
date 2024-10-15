import { AnchorProvider, Program, Wallet } from "@coral-xyz/anchor";
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

  async getStorageAccountInfo(account: PublicKey): Promise<any> {
    try {
      return await this.program.account.ospStorage.fetch(account);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getProfileAccountInfo(account: PublicKey): Promise<any> {
    try {
      return await this.program.account.profile.fetch(account);
    } catch (error) {
      console.log(`${account} not is profile account`);
      return null;
    }
  }

  async getCommunityAccountInfo(account: PublicKey): Promise<any> {
    try {
      return await this.program.account.community.fetch(account);
    } catch (error) {
      console.log(`${account} not is community account`);
      return null;
    }
  }

  async getActivityAccountInfo(account: PublicKey): Promise<any> {
    try {
      return await this.program.account.activity.fetch(account);
    } catch (error) {
      console.log(`${account} not is activity account`);
      return null;
    }
  }

  async getCommentAccountInfo(account: PublicKey): Promise<any> {
    try {
      return await this.program.account.comment.fetch(account);
    } catch (error) {
      console.log(`${account} not is comment account`);
      return null;
    }
  }

  async getMegaphoneAccountInfo(account: PublicKey): Promise<any> {
    try {
      return await this.program.account.megaphone.fetch(account);
    } catch (error) {
      console.log(`${account} not is megaphone account`);
      return null;
    }
  }
}
