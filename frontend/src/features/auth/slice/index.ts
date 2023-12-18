import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

import { User } from '../types';

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectAuthSlice = (state: RootState) => state.auth;

export default authSlice.reducer;
