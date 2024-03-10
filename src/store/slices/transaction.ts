import {
  SignAndCreateTransactionQuery,
  SignTransactionQuery,
  TransactionState,
} from 'types/Transaction';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { transactionSaga } from '../sagas/transaction';

export const initialState: TransactionState = {
  data: {},
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    doCreateTransaction(state, action: { payload: SignAndCreateTransactionQuery }) {
      state.loading = true;
      state.error = null;
    },
    doCreatedTransaction(state, action) {
      state.loading = false;
      state.data = {
        ...state.data,
        transaction: action.payload,
      };
    },
    doSignTransaction(state, action: { payload: SignTransactionQuery }) {
      state.loading = true;
      state.error = null;
    },
    doSignedTransaction(state, action) {
      state.loading = false;
      state.data = {
        ...state.data,
        transaction: action.payload,
      };
    },
    doFetchTransactionPool(state) {
      state.loading = true;
      state.error = null;
    },
    doFetchedTransactionPool(state, action) {
      state.data = {
        ...state.data,
        transactionPool: action.payload,
      };
      state.loading = false;
    },
    doFetchTransactionHistory(state, action: { payload: string }) {},
    doFetchedTransactionHistory(state, action) {
      state.data = {
        ...state.data,
        transactionHistory: action.payload,
      };
      state.loading = false;
    },
    doFetchTransactionDetail(state, action: { payload: string }) {},
    doFetchedTransactionDetail(state, action) {
      state.data = {
        ...state.data,
        transaction: action.payload,
      };
      state.loading = false;
    },
    Error(state, action) {
      state.error = {
        ...state.error,
        message: action.payload,
      };
      state.loading = false;
    },
    finished(state) {
      state.loading = false;
    },
  },
});

export const { name, actions: transactionActions, reducer } = slice;

export const useTransactionSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: transactionSaga });

  return {
    actions: transactionActions,
  };
};
