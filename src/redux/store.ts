import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { useSelector } from "react-redux";
import UserData from "../model/UserData";
import { codeReducer } from "./slices/codeSlice";
import { alertReducer } from "./slices/alertSlice";
import InputResult from "../model/InputResult";
import CodePayload from "../model/CodePayload";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    codeState: codeReducer,
    alertState: alertReducer,
  }
});

export function useSelectorAuth() {
  return useSelector<any, UserData>(state => state.authState.userData);
}

export function useSelectorCode() {
  return useSelector<any, CodePayload>(state => state.codeState.codeMessage);
}
export function useSelectorAlert() {
  return useSelector<any, InputResult>(state => state.alertState.alert)
}
