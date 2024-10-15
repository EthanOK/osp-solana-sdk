import {
  getDevConnection,
  getLocalConnection,
  OSP_IDL,
  OSPProgram,
  PublicKey,
} from "../src";

async function main() {
  const connection = getLocalConnection();

  // console.log("Connection:", connection);


  let wallet;

  const program = new OSPProgram(OSP_IDL, connection, wallet);
  
  // console.log("Program:", program);
  

  const info = await program.getStorageAccountInfo(
    new PublicKey("DUNjGpYgP97mSoJ7VCMDGSz61vYsrSJ7JrhszSB8gdmR")
  );
  console.log(info);

  // storage DUNjGpYgP97mSoJ7VCMDGSz61vYsrSJ7JrhszSB8gdmR
}

main()
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
  });
