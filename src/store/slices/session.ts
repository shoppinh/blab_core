import { PayloadAction } from '@reduxjs/toolkit';
import { loadDocumentCookieState } from 'store/cookieHandle';
import { loadState } from 'store/localStorage';
import { sessionSaga } from 'store/sagas/session';
import {
  AuthPayLoad,
  AuthQuery,
  AuthUserPayload,
  LogoutQuery,
  OnlyTokenQuery,
  Profile,
  RefreshTokenQuery,
  SessionError,
  SessionState,
  UpdateUserQuery,
} from 'types/Session';
import { UserPayload } from 'types/User';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

const sessionCache = loadState()?.session;
const authCache = sessionCache?.data?.auth?.rememberMe
  ? sessionCache?.data?.auth
  : loadDocumentCookieState()?.auth;

export const initialState: SessionState = {
  data: {
    ...sessionCache?.data,
    auth: authCache,
  },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateAuth(state: any, action: PayloadAction<AuthPayLoad>) {
      state.data = {
        ...state.data,
        auth: {
          ...state.data.auth,
          ...action.payload,
        },
      };
      state.loading = false;
    },
    doLogin(state: any, action: PayloadAction<AuthQuery>) {
      state.error = null;
      state.data.auth = { isLogout: false };
      state.loading = true;
    },
    doGetUserProfile(state: any, action: PayloadAction<OnlyTokenQuery>) {
      state.error = null;
      state.loading = true;
    },
    doRegister(state: any, action: PayloadAction<UserPayload>) {
      state.error = null;
      state.loading = true;
    },
    doRegisterSuccess(state: any) {
      state.error = null;
      state.loading = false;
    },
    doGetUserProfileSuccess(state: any, action: PayloadAction<Profile>) {
      state.error = null;
      state.data = {
        ...state.data,
        profile: action.payload,
      };
      state.loading = false;
    },
    doRefreshToken(state: any, action: PayloadAction<RefreshTokenQuery>) {
      state.error = null;
      // state.data.auth = initialState.data.auth || {};
      state.loading = true;
    },
    doLogout(state: any, _action: PayloadAction<LogoutQuery>) {
      state.error = null;
      state.data.auth = {
        isLogout: true,
      };
      state.loading = false;
    },
    doGetUserInfo(state: any, _action: PayloadAction<AuthQuery>) {
      state.error = null;
      state.loading = true;
    },
    updateUserInfo(state: any, _action: PayloadAction<UpdateUserQuery>) {
      state.error = null;
      state.loading = true;
    },
    updatedUserInfo(state: any, action: PayloadAction<AuthUserPayload>) {
      state.error = null;
      state.data.auth = {
        ...state.data.auth,
        user: {
          ...state.data.auth?.user,
          data: action.payload.user,
        },
      };
      state.loading = false;
    },

    Error(state: any, action: PayloadAction<SessionError>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { name, actions: sessionActions, reducer } = slice;

export const useSessionSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: sessionSaga });
  return {
    actions: sessionActions,
  };
};
