import { createSlice } from "@reduxjs/toolkit";
import { RootState } from ".";

interface ISidebarState {
  open: boolean;
}

const initialState: ISidebarState = {
  open: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.open = true;
    },
    closeSidebar: (state) => {
      state.open = false;
    },
  },
});

export const { openSidebar, closeSidebar } = sidebarSlice.actions;

export const isOpen = (state: RootState) => state.sidebar.open;

export default sidebarSlice.reducer;
