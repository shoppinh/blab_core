import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiGenerateKeyPair, apiGetBalance } from 'services/api/apiHelper';
import { walletActions as actions } from '../slices/wallet';
import { PayloadAction } from '@reduxjs/toolkit';
import { BalanceQuery } from 'types/Wallet';
export function* walletSaga() {
  yield all([
    takeLatest(actions.doGenerateKeyPair, generateKeyPairSaga),
    takeLatest(actions.doFetchBalance, fetchBalanceSaga),
  ]);
}

export function* generateKeyPairSaga(): Generator<any, void, any> {
  try {
    const res = yield call(apiGenerateKeyPair);
    if (res?.data) {
      yield put(actions.doGeneratedKeyPair(res.data));
    } else {
      yield put(actions.Error('Error generating key pair'));
    }
  } catch (error) {
    console.log('🚀 ~ function*generateKeyPairSaga ~ error:', error);
  }
}
export function* fetchBalanceSaga({
  payload,
}: PayloadAction<BalanceQuery>): Generator<any, void, any> {
  try {
    const res = yield call(apiGetBalance, payload);
    if (res?.data) {
      yield put(actions.doFetchedBalance(res.data));
    } else {
      yield put(actions.Error('Error fetching balance'));
    }
  } catch (error) {
    console.log('🚀 ~ function*fetchBalanceSaga ~ error:', error);
  }
}
