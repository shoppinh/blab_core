import { configureStore, getDefaultMiddleware, StoreEnhancer } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash.throttle';
import { createReducer } from './reducer';
import { loadDocumentCookieState, saveDocumentCookieState } from './cookieHandle';

// const persistedState = loadState();

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const store = configureStore({
    reducer: createReducer() as any,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          // Ignore these field paths in all actions
          ignoredActionPaths: ['payload.callback'],
        },
      }),
      ...middlewares,
    ],
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL.length > 0,
    enhancers,
    // preloadedState: persistedState
  });

  store.subscribe(
    throttle(() => {
      const persistedStateCache = loadState();
      const sharedCookie = loadDocumentCookieState();
      const cookieAuth = sharedCookie?.auth;
      const currentStore = store.getState() ?? {};
      const loadData = (key: string) => ({
        data: {
          ...(currentStore?.[key] ? currentStore?.[key]?.data : persistedStateCache?.[key]?.data),
        },
      });
      let sessionCache = {};
      if (!persistedStateCache?.session?.data?.auth?.rememberMe) {
        if (
          store.getState().session?.data?.auth &&
          Object.keys(store.getState().session?.data?.auth || {}).length > 0
        ) {
          if (!store.getState().session?.data?.auth?.isLogout) {
            sessionCache = {
              auth: {
                ...store.getState().session?.data?.auth,
              },
            };
          } else {
            sessionCache = {
              auth: {},
            };
          }
        } else {
          // handle refresh not clear and restore
          sessionCache = {
            auth: {
              ...cookieAuth,
            },
          };
        }
      } else {
        sessionCache = {
          auth: {},
        };
      }

      saveDocumentCookieState(sessionCache);

      saveState({
        session: {
          data: {
            ...(store.getState().session
              ? {
                  ...store.getState().session.data,
                  auth: {
                    ...(store.getState().session.data.auth?.rememberMe
                      ? store.getState().session.data.auth
                      : {}),
                  },
                }
              : persistedStateCache?.session?.data),
          },
        },
        system: loadData('system'),
        wallet: loadData('wallet'),
      });
    }, 1000)
  );

  return store;
}
