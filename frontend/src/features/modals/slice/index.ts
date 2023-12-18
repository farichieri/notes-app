import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

interface ModalsState {
  isSignUpModalOpen: boolean;
  isSignInModalOpen: boolean;
  isSidebarOpen: boolean;
}

const initialState: ModalsState = {
  isSignUpModalOpen: false,
  isSignInModalOpen: false,
  isSidebarOpen: false,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    setSignUpModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isSignUpModalOpen = action.payload;
    },
    setSignInModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isSignInModalOpen = action.payload;
    },
    setToggleSidebarIsOpen: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
});

export const {
  setSignInModalOpen,
  setSignUpModalOpen,
  setToggleSidebarIsOpen,
} = modalsSlice.actions;

export const selectModalSlice = (state: RootState) => state.modals;

export default modalsSlice.reducer;
