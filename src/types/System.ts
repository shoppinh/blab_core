export interface SystemPayload {
  accessPageTime?: string;
}

export interface SystemState {
  data: SystemPayload;
  error?: SystemError | null;
  loading?: boolean;
}

export enum SystemErrorType {
  RESPONSE_ERROR = 1,
  AUTHENTICATION_FAILED = 400,
}

export interface SystemError {
  code: SystemErrorType | null;
  message?: string;
}
