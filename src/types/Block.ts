export interface BlockListItem {
  blockNumber: number;
  hash: string;
  miner: string;
  mined: string;
  txCount: number;
  total: number;
  sent: string;
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
  block?: BlockListItem;
  minedBlock?: BlockListItem;
}

export enum BlockErrorType {
  RESPONSE_ERROR = 1,
  AUTHENTICATION_FAILED = 400,
}

export interface BlockError {
  code: BlockErrorType | null;
  message?: string;
}
