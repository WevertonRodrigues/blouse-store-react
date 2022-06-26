import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { User } from "../services/models";

interface IUserState {
  user: User | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = null
    }
  },
});

export const { setUser, resetUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user.user

export default userSlice.reducer;
