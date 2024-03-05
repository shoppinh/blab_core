import { WalletState } from 'types/Wallet';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { walletSaga } from '../sagas/wallet';

export const initialState: WalletState = {
  data: {},
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    doGenerateKeyPair(state, action) {
      state.loading = true;
      state.error = null;
    },
    doGeneratedKeyPair(state, action) {
      state.loading = false;
      state.data = {
        ...state.data,
        keyPair: action.payload,
      };
    },
    doFetchBalance(state, action) {
      state.loading = true;
      state.error = null;
    },
    doFetchedBalance(state, action) {
      state.loading = false;
      state.data = {
        ...state.data,
        balance: action.payload,
      };
    },
    Error(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { name, actions: walletActions, reducer } = slice;

export const useWalletSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: walletSaga });

  return {
    actions: walletActions,
  };
};
