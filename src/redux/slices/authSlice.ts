import { createSlice } from '@reduxjs/toolkit';
import UserData from '../../model/UserData';

const AUTH_ITEM = "auth-item";
const initialState: { userData: UserData } = {
  userData: getUserData()
}

function getUserData(): UserData {
  const userDataJson = localStorage.getItem(AUTH_ITEM)
  return userDataJson && JSON.parse(userDataJson);
}

const authSlice = createSlice({
  initialState,
  name: "authState",
  reducers: {
    set: (state, data) => {
      state.userData = data.payload
      data.payload && localStorage.setItem(AUTH_ITEM, JSON.stringify(data.payload));
    },
    reset: (state) => {
      state.userData = null;
      localStorage.removeItem(AUTH_ITEM);
    }
  }
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;


