import { TransactionState } from 'types/Transaction';
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
    doCreateTransaction(state, action) {
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
    doSignTransaction(state, action) {
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
    doFetchTransactionPool(state, action) {
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
    Error(state, action) {
      state.error = action.payload;
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
