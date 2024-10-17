import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import nacl from "tweetnacl";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { TOKEN_METADATA_PROGRAM_ID } from "../osp/constant";

export const signMessage = (message: string, secretKey: Uint8Array) => {
  const messageBytes = Buffer.from(message);
  const signature = nacl.sign.detached(messageBytes, secretKey);
  return bs58.encode(signature);
};

export const verifySignature = (
  message: string,
  signature: string,
  publicKey: PublicKey
) => {
  const result = nacl.sign.detached.verify(
    Buffer.from(message),
    bs58.decode(signature),
    publicKey.toBytes()
  );
  return result;
};

export const requestAirdrop = async (
  connection: Connection,
  account: PublicKey
) => {
  const tx = await connection.requestAirdrop(account, 10 * LAMPORTS_PER_SOL);
  await connection.confirmTransaction(tx);
};

export const getMetadata = (mint: PublicKey): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0];
};

export const getMasterEdition = (mint: PublicKey): PublicKey => {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    TOKEN_METADATA_PROGRAM_ID
  )[0];
};
