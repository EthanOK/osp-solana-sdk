import { Wallet } from "@coral-xyz/anchor";
import { Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  CommentCondition,
  Currency,
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
    new PublicKey("6fsEoC8feGM1Hg4YtkP54D2QaDDZiL7WUentoDDF3FQo")
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

  // user1 join community2
  const joinCommunity_tx = await program.joinCommunity(
    user1ProfilePDA,
    community2PDA
  );
  console.log("joinCommunity_tx:", joinCommunity_tx);

  let user2ProfileAccountInfo = await program.getProfileAccountInfo(
    user2ProfilePDA
  );
  const activityPDA2 = program2.getActivityPDA(
    user2ProfileAccountInfo.handle,
    user2ProfileAccountInfo.contentCount
  );

  const createActivity_tx = await program2.createActivity(
    user2ProfilePDA,
    "https://www.google.com/1",
    community2PDA
  );
  console.log("createActivity_tx:", createActivity_tx);

  console.log(
    "activityPDA Info:",
    await program2.getActivityAccountInfo(activityPDA2)
  );

  // user2 set comment conditions
  const setCommentConditions_tx = await program2.setCommentConditions(
    user2ProfilePDA,
    activityPDA2,
    CommentCondition.SameCommunity
  );
  console.log("setCommentConditions_tx:", setCommentConditions_tx);

  console.log(
    "activityPDA Info:",
    await program2.getActivityAccountInfo(activityPDA2)
  );

  const createComment_tx = await program2.createComment(
    user2ProfilePDA,
    activityPDA2,
    "https://www.google.com/111",
    community2PDA
  );
  console.log("createComment_tx:", createComment_tx);

  // user2 set comment conditions
  await program2.setCommentConditions(
    user2ProfilePDA,
    activityPDA2,
    CommentCondition.OnlyFollowers
  );
  console.log("setCommentConditions_tx:", setCommentConditions_tx);

  console.log(
    "activityPDA Info:",
    await program2.getActivityAccountInfo(activityPDA2)
  );

  const createComment_tx1 = await program.createComment(
    user1ProfilePDA,
    activityPDA2,
    "https://www.google.com/111",
    null,
    user2ProfilePDA
  );
  console.log("createComment_tx1:", createComment_tx1);

  const deleteComment_tx = await program.deleteComment(
    user1ProfilePDA,
    activityPDA2,
    1
  );

  //use1 create megaphone 
  const createMegaphone_tx = await program.createMegaphone(
    user2ProfilePDA,
    activityPDA2,
    ["mgp"],
    Currency.SOL,
    LAMPORTS_PER_SOL,
    3600
  );
  console.log("createMegaphone_tx:", createMegaphone_tx);
}

main();
