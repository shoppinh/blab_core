import { BlockQuery, BlockState, MineBlockQuery } from 'types/Block';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { blockSaga } from '../sagas/block';

export const initialState: BlockState = {
  data: {},
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    doFetchBlocks(state) {
      state.loading = true;
      state.error = null;
    },
    doFetchedBlocks(state, action) {
      state.data = {
        ...state.data,
        blocks: action.payload,
      };
      state.loading = false;
    },
    doFetchBlock(state, _action: { payload: BlockQuery }) {
      state.loading = true;
      state.error = null;
    },
    doFetchedBlock(state, action) {
      state.data = {
        ...state.data,
        block: action.payload,
      };
      state.loading = false;
    },
    doMineBlock(state, _action: { payload: MineBlockQuery }) {
      state.loading = true;
      state.error = null;
    },
    doMinedBlock(state, action) {
      state.data = {
        ...state.data,
        minedBlock: action.payload,
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

export const { name, actions: blockActions, reducer } = slice;

export const useBlockSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: blockSaga });

  return {
    actions: blockActions,
  };
};
