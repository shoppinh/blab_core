import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'app/store/slices/session';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.session || initialState;

export const getUserProfile = createSelector([selectDomain], (state) => state.data?.profile);
export const getAuthLoading = createSelector([selectDomain], (state) => state.loading);

export const getAccessToken = createSelector(
  [selectDomain],
  (state) => state.data.auth?.accessToken
);

export const getRefreshToken = createSelector(
  [selectDomain],
  (state) => state.data.auth?.refreshToken
);

export const getAuthError = createSelector([selectDomain], (state) => state.error);
