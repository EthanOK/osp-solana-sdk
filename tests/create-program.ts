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
}

main();
