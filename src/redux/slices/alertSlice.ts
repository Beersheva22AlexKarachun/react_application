import { createSlice } from '@reduxjs/toolkit';
import { StatusType } from '../../model/StatusType';
import InputResult from '../../model/InputResult';

const initialState: { alert: InputResult } = {
  alert: {
    status: "success",
    message: ""
  }
}

const alertSlice = createSlice({
  initialState,
  name: "codeState",
  reducers: {
    set: (state, data) => {
      state.alert = data.payload
    },
    reset: (state) => {
      state.alert = initialState.alert
    }
  }
});

export const alertActions = alertSlice.actions;
export const alertReducer = alertSlice.reducer;


