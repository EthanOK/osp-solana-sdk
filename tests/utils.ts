import { Keypair } from "@solana/web3.js";

export function parsePair(str_keyPair: string) {
  const pair = JSON.parse(str_keyPair);
  const keyPair = Keypair.fromSecretKey(Uint8Array.from(pair));

  return keyPair;
}
