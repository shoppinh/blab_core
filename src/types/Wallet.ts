export interface BalanceQuery {
  address: string;
}

export interface WalletState {
  data: WalletPayload;
  error?: WalletError | null;
  loading?: boolean;
}

export interface WalletPayload {
  balance?: number;
  keyPair?: KeyPair;
}

export interface KeyPair {
  publicKey: string;
  privateKey: string;
  address: string;
}

export enum WalletErrorType {
  RESPONSE_ERROR = 1,
  AUTHENTICATION_FAILED = 400,
}

export interface WalletError {
  code: WalletErrorType | null;
  message?: string;
}
