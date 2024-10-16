import { assert } from "chai";
import { Keypair, signMessage, verifySignature } from "../src";

describe("Test solana signMessage", () => {
  const signer = Keypair.generate();
  it("secretKey sign message 100", async () => {
    for (let i = 0; i < 100; i++) {
      const signature = signMessage(`test${i}`, signer.secretKey);
      // console.log(signature);
      const r = verifySignature(`test${i}`, signature, signer.publicKey);
      // console.log(r);
      assert.equal(r, true)
    }
  });
});
