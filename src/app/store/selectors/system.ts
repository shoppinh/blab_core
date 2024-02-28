import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'app/store/slices/system';
const selectDomain = (state: RootState) => state.system ?? initialState;

export const getSystemSettings = createSelector([selectDomain], (state) => state.data);
