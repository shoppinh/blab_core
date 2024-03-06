export interface CreateTransactionQuery {
  from: string;
  to: string;
  value: number;
  data: string;
  timestamp: number;
  signature: string;
  publicKey: string;
}

export interface SignAndCreateTransactionQuery {
  from: string;
  to: string;
  value: number;
  data: string;
  timestamp: number;
  publicKey: string;
  privateKey: string;
}

export interface SignTransactionQuery {
  privateKey: string;
  from: string;
  to: string;
  value: number;
  data: string;
  timestamp: number;
}

export interface TransactionItem {
  hash: string;
  signature: string;
  from: string;
  to: string;
  value: number;
  timestamp: number;
  data: string;
}

export interface TransactionState {
  data: TransactionPayload;
  error?: TransactionError | null;
  loading?: boolean;
}

export interface TransactionPayload {
  transaction?: TransactionItem;
  transactionPool?: TransactionItem[];
  transactionHistory?: TransactionItem[];
}

export enum TransactionErrorType {
  RESPONSE_ERROR = 1,
  AUTHENTICATION_FAILED = 400,
}

export interface TransactionError {
  code?: TransactionErrorType | null;
  message?: string;
}
