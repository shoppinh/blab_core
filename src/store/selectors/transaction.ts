import { RootState } from 'types';
import { initialState } from 'store/slices/transaction';
import { createSelector } from '@reduxjs/toolkit';
const selectedDomain = (state: RootState) => state.transaction ?? initialState;

export const getTransactionPool = createSelector(
  [selectedDomain],
  (state) => state.data.transactionPool
);

export const getTransactionDetail = createSelector(
  [selectedDomain],
  (state) => state.data.transaction
);
export const getTransactionLoading = createSelector([selectedDomain], (state) => state.loading);
export const getTransactionError = createSelector([selectedDomain], (state) => state.error);
export const getTransactionHistory = createSelector(
  [selectedDomain],
  (state) => state.data.transactionHistory
);
