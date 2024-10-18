import { Wallet } from "@coral-xyz/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import {
  FollowCondition,
  getDevConnection,
  getLocalConnection,
  OSP_IDL,
  OSPProgram,
  requestAirdrop,
} from "../src";
// } from "osp-solana-sdk";

async function main() {
  const connection = getLocalConnection();
  const user1 = Keypair.generate();
  const user2 = Keypair.generate();

  await requestAirdrop(connection, user1.publicKey);
  await requestAirdrop(connection, user2.publicKey);

  const program = new OSPProgram(OSP_IDL, connection, new Wallet(user1));
  const program2 = new OSPProgram(OSP_IDL, connection, new Wallet(user2));

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

  // const initializeStorage_tx = await program.initializeStorage();
  // console.log("initializeStorage tx:", initializeStorage_tx);

  const timestamp = Date.now() % 10000;

  const user1ProfilePDA = program.getProfilePDA(`osp_${timestamp}`);

  const user2ProfilePDA = program2.getProfilePDA(`osp2_${timestamp}`);

  const initializeProfile_tx = await program.initializeProfile(
    `osp_${timestamp}`,
    "https://www.google.com/1",
    "https://www.google.com/2"
  );
  console.log("initializeProfile tx:", initializeProfile_tx);

  let profileAccountInfo = await program.getProfileAccountInfo(user1ProfilePDA);
  console.log("profile AccountInfo:\n", profileAccountInfo);

  let followProfile_tx = await program.followProfile(
    user1ProfilePDA,
    program.getProfilePDA(`profile`)
  );
  console.log("followProfile tx:", followProfile_tx);

  let setFollowConditions_tx = await program.setFollowConditions(
    user1ProfilePDA,
    FollowCondition.FollowHandle,
    "osp123"
  );
  console.log("setFollowConditions tx:", setFollowConditions_tx);

  profileAccountInfo = await program.getProfileAccountInfo(user1ProfilePDA);
  console.log("profile AccountInfo:\n", profileAccountInfo);

  setFollowConditions_tx = await program.setFollowConditions(
    user1ProfilePDA,
    FollowCondition.None
  );
  console.log("setFollowConditions tx:", setFollowConditions_tx);

  profileAccountInfo = await program.getProfileAccountInfo(user1ProfilePDA);
  console.log("profile AccountInfo:\n", profileAccountInfo);

  setFollowConditions_tx = await program.setFollowConditions(
    user1ProfilePDA,
    FollowCondition.FollowersNumber,
    1
  );
  console.log("setFollowConditions tx:", setFollowConditions_tx);

  profileAccountInfo = await program.getProfileAccountInfo(user1ProfilePDA);
  console.log("profile AccountInfo:\n", profileAccountInfo);

  const communityPDA = program.getCommunityPDA(`community1_${timestamp}`);

  let createCommunity_tx = await program.createCommunity(
    user1ProfilePDA,
    `community1_${timestamp}`,
    "https://www.google.com/1",
    "https://www.google.com/2"
  );
  console.log("createCommunity tx:", createCommunity_tx);

  console.log("`````````````````````````");

  await program2.initializeProfile(
    `osp2_${timestamp}`,
    "https://www.google.com/1",
    "https://www.google.com/2"
  );

  followProfile_tx = await program.followProfile(
    user1ProfilePDA,
    user2ProfilePDA
  );
  console.log("user1 follow user2 tx:", followProfile_tx);

  followProfile_tx = await program2.followProfile(
    user2ProfilePDA,
    user1ProfilePDA
  );
  console.log("user2 follow user1 tx:", followProfile_tx);

  createCommunity_tx = await program2.createCommunity(
    user2ProfilePDA,
    `community2_${timestamp}`,
    "https://www.google.com/1",
    "https://www.google.com/2"
  );
  console.log("createCommunity tx:", createCommunity_tx);

  const community2PDA = program2.getCommunityPDA(`community2_${timestamp}`);
  let communityAccountInfo = await program2.getCommunityAccountInfo(
    community2PDA
  );
  console.log("community AccountInfo:\n", communityAccountInfo);

  const createActivity_tx = await program2.createActivity(
    user2ProfilePDA,
    community2PDA,
    "https://www.google.com/1"
  );
  console.log("createActivity tx:", createActivity_tx);
}

main();
