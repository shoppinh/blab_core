import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { SystemPayload, SystemState } from 'types/System';
import { systemSaga } from '../sagas/system';
import { loadState } from 'store/localStorage';

const systemCached = loadState()?.system;
export const initialState: SystemState = {
  data: {
    ...systemCached?.data,
  },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    updateSystemState(state, action: PayloadAction<SystemPayload>) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
    loadSystemSetting(state) {},
  },
});

export const { name, actions: systemActions, reducer } = slice;

export const useSystemSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: systemSaga });

  return {
    actions: systemActions,
  };
};
