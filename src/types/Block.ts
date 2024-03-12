import { TransactionItem } from './Transaction';

export interface BlockListItem {
  blockNumber: number;
  hash: string;
  miner: string;
  totalSent: number;
  difficulty: number;
  transactions: TransactionItem[];
  parentHash: string;
  nonce: number;
  binary: string;
  timestamp: number;
}

export type BlockListRenderedItem = Omit<BlockListItem, 'binary' | 'nonce' | 'parentHash'>;

export interface BlockDetail {
  blockNumber: number;
  hash: string;
  parentHash: string;
  timestamp: number;
  transactions: TransactionItem[];
  nonce: number;
}

export interface BlockQuery {
  blockNumber: number;
}

export interface MineBlockQuery {
  minerAddress: string;
}

export interface BlockState {
  data: BlockPayload;
  error?: BlockError | null;
  loading?: boolean;
}

export interface BlockPayload {
  blocks?: BlockListItem[];
  block?: BlockDetail;
  minedBlock?: BlockDetail;
}

export enum BlockErrorType {
  RESPONSE_ERROR = 1,
  AUTHENTICATION_FAILED = 400,
}

export interface BlockError {
  code?: BlockErrorType | null;
  message?: string;
}
