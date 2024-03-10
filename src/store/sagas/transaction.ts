import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiCreateTransaction,
  apiGetTransactionDetail,
  apiGetTransactionHistory,
  apiGetTransactionPool,
  apiSignTransaction,
} from 'services/api/apiHelper';
import { CreateTransactionQuery, SignAndCreateTransactionQuery } from 'types/Transaction';
import { transactionActions as actions } from '../slices/transaction';
export function* transactionSaga() {
  yield all([
    takeLatest(actions.doCreateTransaction, createTransactionSaga),
    takeLatest(actions.doFetchTransactionPool, fetchTransactionPoolSaga),
    takeLatest(actions.doFetchTransactionHistory, fetchTransactionHistorySaga),
    takeLatest(actions.doFetchTransactionDetail, fetchTransactionDetailSaga),
  ]);
}

export function* createTransactionSaga({
  payload,
}: PayloadAction<SignAndCreateTransactionQuery>): Generator<any, void, any> {
  try {
    const signTransactionPayload = {
      privateKey: payload.privateKey,
      from: payload.from,
      to: payload.to,
      value: payload.value,
      data: payload.data,
      timestamp: payload.timestamp,
    };

    const res = yield call(apiSignTransaction, signTransactionPayload);
    if (res?.data?.data) {
      const createTransactionPayload: CreateTransactionQuery = {
        signature: res.data.data,
        from: payload.from,
        to: payload.to,
        value: payload.value,
        data: payload.data,
        timestamp: payload.timestamp,
        publicKey: payload.publicKey,
      };
      const transactionResult = yield call(apiCreateTransaction, createTransactionPayload);
      if (transactionResult?.data?.data) {
        yield put(actions.doCreatedTransaction(transactionResult.data.data));
      } else {
        yield put(actions.Error(transactionResult.data.error));
      }
    } else {
      yield put(actions.Error(res.data.error));
    }
  } catch (error: any) {
    console.log('🚀 ~ function*signTransactionSaga ~ error:', error);
  } finally {
    yield put(actions.finished());
  }
}
export function* fetchTransactionPoolSaga(): Generator<any, void, any> {
  try {
    const res = yield call(apiGetTransactionPool);
    if (res?.data?.data) {
      yield put(actions.doFetchedTransactionPool(Object.values(res.data.data)));
    } else {
      yield put(actions.Error(res.data.error));
    }
  } catch (error: any) {
    console.log('🚀 ~ function*fetchTransactionPoolSaga ~ error:', error);
  } finally {
    yield put(actions.finished());
  }
}

export function* fetchTransactionHistorySaga({
  payload,
}: PayloadAction<string>): Generator<any, void, any> {
  try {
    const res = yield call(apiGetTransactionHistory, payload);
    if (res?.data?.data) {
      yield put(actions.doFetchedTransactionHistory(res.data.data));
    } else {
      yield put(actions.Error(res.data.error));
    }
  } catch (error: any) {
    console.log('🚀 ~ function*fetchTransactionHistorySaga ~ error:', error);
  } finally {
    yield put(actions.finished());
  }
}

export function* fetchTransactionDetailSaga({
  payload,
}: PayloadAction<string>): Generator<any, void, any> {
  try {
    const res = yield call(apiGetTransactionDetail, payload);
    if (res?.data?.data) {
      yield put(actions.doFetchedTransactionDetail(res.data.data));
    } else {
      yield put(actions.Error(res.data.error));
    }
  } catch (error: any) {
    console.log('🚀 ~ function*fetchTransactionDetailSaga ~ error:', error);
  } finally {
    yield put(actions.finished());
  }
}
