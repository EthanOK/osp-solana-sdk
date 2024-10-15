import { Connection, clusterApiUrl }from "@solana/web3.js";
export const getDevConnection = () => {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
  return connection;
};

export const getLocalConnection = () => {
  const connection = new Connection("http://127.0.0.1:8899","confirmed");
  return connection;
};

export const getTestConnection = () => {
  const connection = new Connection(clusterApiUrl("testnet"), "confirmed");
  return connection;
};

export const getMainConnection = () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  return connection;
};
