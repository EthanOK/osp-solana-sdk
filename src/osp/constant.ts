import open_social_idl from "../idl/open_social.json";
import { PublicKey } from "@solana/web3.js";
export const OSP_IDL = open_social_idl;

// TODO: test program id
export const OSP_PROGRAM_ID = new PublicKey(
  "ospPaFn5JvovJ8NYsPmpP19EZjkMBYaNGucFiiRMpAe"
);

export const TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export const USDC = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);

//TODO: test treasury
export const OSP_MEGAPHONE_TREASURY = new PublicKey(
  "GkvSQVVJemmah9YGNj127mSjPbh4ekmt48QQ6t4zRDVV"
);
