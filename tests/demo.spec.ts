import { assert } from "chai";
import { Keypair } from "@solana/web3.js";
// import {signMessage, verifySignature } from "../src";
import {signMessage, verifySignature } from "osp-solana-sdk";

describe("Test solana signMessage", () => {
  const signer = Keypair.generate();
  it("secretKey sign message 100", async () => {
    for (let i = 0; i < 100; i++) {
      const signature = signMessage(`test${i}`, signer.secretKey);
      // console.log(signature);
      const r = verifySignature(`test${i}`, signature, signer.publicKey);
      // console.log(r);
      assert.equal(r, true);
    }
  });
});
