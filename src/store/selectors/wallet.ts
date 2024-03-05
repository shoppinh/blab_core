import { RootState } from 'types';
import { initialState } from 'store/slices/wallet';
import { createSelector } from '@reduxjs/toolkit';
const selectedDomain = (state: RootState) => state.wallet ?? initialState;

export const getBalance = createSelector([selectedDomain], (state) => state.data.balance);
export const getKeyPair = createSelector([selectedDomain], (state) => state.data.keyPair);
export const getWalletLoading = createSelector([selectedDomain], (state) => state.loading);
export const getWalletError = createSelector([selectedDomain], (state) => state.error);
