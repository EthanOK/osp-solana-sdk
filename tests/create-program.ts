import { Wallet } from "@coral-xyz/anchor";
import {
  getDevConnection,
  getLocalConnection,
  Keypair,
  OSP_IDL,
  OSPProgram,
  PublicKey,
  requestAirdrop,
} from "../src";

async function main() {
  const connection = getLocalConnection();
  const payer = Keypair.generate();

  await requestAirdrop(connection, payer.publicKey);

  let wallet = new Wallet(payer);

  const program = new OSPProgram(OSP_IDL, connection, wallet);

  console.log(program.program.provider.publicKey);

  const storageAccount = await program.getStorageAccountInfo(
    new PublicKey("DUNjGpYgP97mSoJ7VCMDGSz61vYsrSJ7JrhszSB8gdmR")
  );
  console.log("storageAccount:\n", storageAccount);

  const profileAccount = await program.getProfileAccountInfo(
    new PublicKey("8sNEFJhaRbDKKdkZhWMhYv4b6HJgfxaiB7caG7WszqpP")
  );
  console.log("profileAccount:\n", profileAccount);

  const communityAccount = await program.getCommunityAccountInfo(
    new PublicKey("SsT6iNN89qExQCyMaKSxMvFL2WZxLr2vXydda1NKw1h")
  );
  console.log("communityAccount:\n", communityAccount);

  const activityAccount = await program.getActivityAccountInfo(
    new PublicKey("2DQ5xiVn3sWAp4hJxRtvM9yJ6zZu68CMFyuHaesbgt6D")
  );
  console.log("activityAccount:\n", activityAccount);

  const commentAccount = await program.getCommentAccountInfo(
    new PublicKey("6GabCJZMMY9ob6tzaHPnaeHD53csPs44hZZdHjErD5vC")
  );
  console.log("commentAccount:\n", commentAccount);

  const megaphoneAccount = await program.getMegaphoneAccountInfo(
    new PublicKey("FvNXMcYZK9FR1DJdBSD6AaYFUAbNERvDs1ycr3TBdxiV")
  );
  console.log("megaphoneAccount:\n", megaphoneAccount);

  const tx = await program.initializeStorage();
  console.log("initializeStorage tx:", tx);
  
}

main();
