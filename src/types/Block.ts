export interface BlockListItem {
  blockNumber: number;
  hash: string;
  miner: string;
  mined: string;
  txCount: number;
  total: number;
  sent: string;
}

export interface TransactionItem {
  txHash: string;
  from: string;
  to: string;
  value: number;
  date: string;
}
