import { all, call, put, takeLatest } from 'redux-saga/effects';
import { transactionActions as actions } from '../slices/transaction';
import { PayloadAction } from '@reduxjs/toolkit';
import { CreateTransactionQuery, SignTransactionQuery } from 'types/Transaction';
import {
  apiCreateTransaction,
  apiGetTransactionPool,
  apiSignTransaction,
} from 'services/api/apiHelper';
export function* transactionSaga() {
  yield all([
    takeLatest(actions.doCreateTransaction, createTransactionSaga),
    takeLatest(actions.doSignTransaction, signTransactionSaga),
    takeLatest(actions.doFetchTransactionPool, fetchTransactionPoolSaga),
  ]);
}

export function* createTransactionSaga({
  payload,
}: PayloadAction<CreateTransactionQuery>): Generator<any, void, any> {
  try {
    const res = yield call(apiCreateTransaction, payload);
    if (res?.data) {
      yield put(actions.doCreatedTransaction(res.data));
    } else {
      yield put(actions.Error('Error creating transaction'));
    }
  } catch (error) {
    console.log('🚀 ~ function*createTransactionSaga ~ error:', error);
  }
}
export function* signTransactionSaga({
  payload,
}: PayloadAction<SignTransactionQuery>): Generator<any, void, any> {
  try {
    const res = yield call(apiSignTransaction, payload);
    if (res?.data) {
      yield put(actions.doSignedTransaction(res.data));
    } else {
      yield put(actions.Error('Error signing transaction'));
    }
  } catch (error) {
    console.log('🚀 ~ function*signTransactionSaga ~ error:', error);
  }
}
export function* fetchTransactionPoolSaga(): Generator<any, void, any> {
  try {
    const res = yield call(apiGetTransactionPool);
    if (res?.data) {
      yield put(actions.doFetchedTransactionPool(res.data));
    } else {
      yield put(actions.Error('Error fetching transaction pool'));
    }
  } catch (error) {
    console.log('🚀 ~ function*fetchTransactionPoolSaga ~ error:', error);
  }
}
