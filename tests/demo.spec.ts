import { ethers } from "ethers";

describe("Test ethers signMessage", () => {
  it("private_key sign message 1000", async () => {
    const deployer = new ethers.Wallet(
      "0xab3301f90a3c1b6d2292268222475ecdb7a11513f192532760809eefce593326"
    );

    for (let i = 0; i < 1000; i++) {
      const signature = await deployer.signMessage("hello world" + i);
      // console.log(signature);
    }
  });
});
