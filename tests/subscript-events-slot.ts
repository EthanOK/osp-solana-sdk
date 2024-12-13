import {
  Connection,
  ParsedAccountsModeBlockResponse,
  PublicKey
} from "@solana/web3.js";
import { getLocalConnection, OSPProgram } from "../src";
import { EventParser } from "@coral-xyz/anchor";

async function getOSPEventsBySlot(
  connection: Connection,
  slot: number,
  programId: PublicKey
) {
  const coder = new OSPProgram(connection, null).program.coder;
  const eventParser = new EventParser(programId, coder);

  const block_datas = await connection.getParsedBlock(slot, {
    commitment: "confirmed",
    rewards: false,
    transactionDetails: "full"
  });

  const datas = handleTransactions(eventParser, block_datas);

  console.log(datas);
}

export interface EventData {
  event: any;
  slot: number;
  signature: string;
}

export function handleTransactions(
  eventParser: EventParser,
  parsedBlockResponse: ParsedAccountsModeBlockResponse
) {
  const transactions = parsedBlockResponse.transactions;
  const datas: EventData[] = [];

  if (!transactions || transactions.length === 0) {
    return datas;
  }
  try {
    transactions.forEach((transaction) => {
      const logMessages = transaction.meta?.logMessages;
      const slot = parsedBlockResponse.blockHeight;
      // TODO: First signature
      const signature = transaction.transaction.signatures[0];

      for (const event of eventParser.parseLogs(logMessages)) {
        datas.push({
          event,
          slot,
          signature
        });
      }
    });
  } catch (error) {
    console.error(error);
  }

  return datas;
}

async function main() {
  const connection = getLocalConnection();
  let slot = await connection.getSlot({
    commitment: "confirmed"
  });

  while (true) {
    let error = false;
    console.log("slot:", slot);
    try {
      await getOSPEventsBySlot(
        connection,
        slot,
        new PublicKey("ospPaFn5JvovJ8NYsPmpP19EZjkMBYaNGucFiiRMpAe")
      );
    } catch {
      error = true;
    }
    if (error) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 450));
      slot++;
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
