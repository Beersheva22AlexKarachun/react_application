import { createSlice } from '@reduxjs/toolkit';
import { ReactNode, useState } from "react";
import ModalContent from '../../model/ModalContent';
import { Typography } from '@mui/material';


const initialState: { content: ModalContent } = {
  content: {
    content: undefined
  }
}

const modalSlice = createSlice({
  initialState,
  name: "modalState",
  reducers: {
    set: (state, data) => {
      state.content = data.payload
    },
    reset: (state) => {
      state.content = initialState.content
    }
  }
});

export const modalActions = modalSlice.actions;
export const modalReducer = modalSlice.reducer;


