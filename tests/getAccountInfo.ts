import { Wallet } from "@coral-xyz/anchor";
import { getLocalConnection, OSP_IDL, OSPProgram } from "../src";
import { PublicKey } from "@solana/web3.js";

async function main() {
  const connection = getLocalConnection();

  const program = new OSPProgram(OSP_IDL, connection, null);
  let result = await program.getStorageAccountInfo(program.getStoragePDA());
  console.log(result);
  
  result= await program.getProfileAccountInfo(new PublicKey("EAcj65RwSVYKwFCVCUpNHWaEGrxewQjqs7eaHXJiKgkg"))
  console.log(result)
}
main();
