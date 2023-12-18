import { combineReducers } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { persistStore } from 'redux-persist';
import { WebStorage } from 'redux-persist/lib/types';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { api } from '@/services';
import authSlice from '@/features/auth/slice';
import modalsSlice from '@/features/modals/slice';

export function createPersistStorage(): WebStorage {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }
  return createWebStorage('local');
}

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createPersistStorage();

const persistConfig = {
  key: 'ensolvers-notes',
  version: 0,
  storage,
  whitelist: ['auth', 'modals'],
};

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authSlice,
  modals: modalsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
