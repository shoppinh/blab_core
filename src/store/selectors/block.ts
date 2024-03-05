import { RootState } from 'types';
import { initialState } from 'store/slices/block';
import { createSelector } from '@reduxjs/toolkit';
const selectedDomain = (state: RootState) => state.block ?? initialState;

export const getBlocks = createSelector([selectedDomain], (state) => state.data.blocks);
export const getBlock = createSelector([selectedDomain], (state) => state.data.block);
export const getMinedBlock = createSelector([selectedDomain], (state) => state.data.minedBlock);
export const getBlockLoading = createSelector([selectedDomain], (state) => state.loading);
export const getBlockError = createSelector([selectedDomain], (state) => state.error);
