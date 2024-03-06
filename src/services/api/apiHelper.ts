import { call } from 'redux-saga/effects';
import {
  AuthQuery,
  LogoutQuery,
  OnlyTokenQuery,
  RefreshTokenQuery,
  UpdateUserQuery,
} from 'types/Session';
import * as api from './index';
import { BlockQuery, MineBlockQuery } from 'types/Block';
import { CreateTransactionQuery, SignTransactionQuery } from 'types/Transaction';
import { BalanceQuery } from 'types/Wallet';

export function* apiLogin(query: AuthQuery): unknown {
  return yield call(api.login, query);
}

export function* apiLogout(query: LogoutQuery): unknown {
  return yield call(api.logout, query);
}

export function* apiRefreshToken(query: RefreshTokenQuery): unknown {
  return yield call(api.refreshToken, query);
}

export function* apiGetUserProfile(query: OnlyTokenQuery): unknown {
  return yield call(api.getUserProfile, query);
}

export function* apiUpdateUserInfo(query: UpdateUserQuery): unknown {
  return yield call(api.updateUserInfo, query);
}

export function* apiGetBlocks(): unknown {
  return yield call(api.getBlocks);
}

export function* apiGetBlock(query: BlockQuery): unknown {
  return yield call(api.getBlock, query);
}

export function* apiMineBlock(query: MineBlockQuery): unknown {
  return yield call(api.mineBlock, query);
}

export function* apiCreateTransaction(query: CreateTransactionQuery): unknown {
  return yield call(api.createTransaction, query);
}
export function* apiGetTransactionPool(): unknown {
  return yield call(api.getTransactionPool);
}
export function* apiGetTransactionHistory(address: string): unknown {
  return yield call(api.getTransactionHistory, address);
}
export function* apiGetTransactionDetail(hash: string): unknown {
  return yield call(api.getTransactionDetail, hash);
}
export function* apiSignTransaction(query: SignTransactionQuery): unknown {
  return yield call(api.signTransaction, query);
}

export function* apiGenerateKeyPair(): unknown {
  return yield call(api.generateKeyPair);
}

export function* apiGetBalance(query: BalanceQuery): unknown {
  return yield call(api.getBalance, query);
}
