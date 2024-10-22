import { getLocalConnection, OSP_IDL, OSPProgram } from "../src";
import { PublicKey } from "@solana/web3.js";

async function main() {
  const connection = getLocalConnection();

  const program = new OSPProgram(connection, null);
  let result = await program.getStorageAccountInfo(program.getStoragePDA());
  console.log(result);
}
main();
