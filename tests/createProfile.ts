import {
  getDevConnection,
  getLocalConnection,
  OSP_IDL,
  OSPProgram
} from "../src";
import { PublicKey } from "@solana/web3.js";
import { parsePair } from "./utils";
import { Wallet } from "@coral-xyz/anchor";
import dotenv from "dotenv";
dotenv.config();
async function main() {
  const SOLANA_KEYPAIR = process.env.SOLANA_KEYPAIR!;
  const connection = getDevConnection();
  const keypair = parsePair(SOLANA_KEYPAIR);

  const program = new OSPProgram(
    connection,
    new Wallet(keypair),
    new PublicKey("Fm85WB7T7eBncZs61XzB444fduzhhKbpthbvTT12Uh88")
  );

  const initializeStorage_tx = await program.initializeStorage();
  console.log(initializeStorage_tx);

  const initializeProfile_tx = await program.initializeProfile(
    `osp_abc`,
    `https://ipfs.opensocial.co/ipfs/QmNfdkqWkAcvjdrJ3gqg1q8ZEDka9tPeefr3e2TE4wSYuW/metadata/1.json`,
    `https://www.google.com/follow/metadata/1.json`
  );
  console.log(initializeProfile_tx);
}
main();
