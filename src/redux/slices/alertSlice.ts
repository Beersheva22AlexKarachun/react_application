import { createSlice } from '@reduxjs/toolkit';
import InputResult from '../../model/InputResult';
import StatusType from '../../model/StatusType';

const initialState: { alert: InputResult } = {
  alert: {
    status: StatusType.SUCCESS,
    message: ""
  }
}

const alertSlice = createSlice({
  initialState,
  name: "alertState",
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


