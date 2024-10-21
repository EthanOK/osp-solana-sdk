import { getLocalConnection, OSP_IDL, OSPProgram } from "../src";

async function main() {
  const connection = getLocalConnection();
  const ospProgram = new OSPProgram(OSP_IDL, connection, null);
  const subscriptionId_profileCreated = ospProgram.program.addEventListener(
    "profileCreated",
    (event) => {
      console.log("profileCreated:", event);
    }
  );

  const subscriptionId_followed = ospProgram.program.addEventListener(
    "followed",
    (event) => {
      console.log("followed:", event);
    }
  );

  const subscriptionId_unfollowed = ospProgram.program.addEventListener(
    "communityCreated",
    (event) => {
      console.log("communityCreated:", event);
    }
  );

  const subscriptionId_joined = ospProgram.program.addEventListener(
    "joined",
    (event) => {
      console.log("joined:", event);
    }
  );

  const subscriptionId_activityCreated = ospProgram.program.addEventListener(
    "activityCreated",
    (event) => {
      console.log("activityCreated:", event);
    }
  );

  const subscriptionId_megaphoneCreated =ospProgram.program.addEventListener(
    "megaphoneCreated",
    (event) => {
      console.log("megaphoneCreated:", event);
    }
  );

  const subscriptionId_commentCreated = ospProgram.program.addEventListener(
    "commentCreated",
    (event) => {
      console.log("commentCreated:", event);
    }
  );
  const subscriptionId_commentCreatedd = ospProgram.program.addEventListener(
    "commentDeleted",
    (event) => {
      console.log("commentDeleted:", event);
    }
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
