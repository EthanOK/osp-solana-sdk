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
    return await this.program.account.ospStorage.fetch(account);
  }

  async getProfileAccountInfo(account: PublicKey): Promise<any> {
    return await this.program.account.profile.fetch(account);
  }

  
}
