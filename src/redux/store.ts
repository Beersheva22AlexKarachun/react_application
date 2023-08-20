import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { codeReducer } from "./slices/codeSlice";
import { alertReducer } from "./slices/alertSlice";
import InputResult from "../model/InputResult";
import CodePayload from "../model/CodePayload";
import { modalReducer } from "./slices/modalSlice";
import ModalContent from "../model/ModalContent";

export const store = configureStore({
  reducer: {
    codeState: codeReducer,
    alertState: alertReducer,
    modalState: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
});


export function useSelectorCode() {
  return useSelector<any, CodePayload>(state => state.codeState.codeMessage);
}
export function useSelectorAlert() {
  return useSelector<any, InputResult>(state => state.alertState.alert)
}
export function useSelectorModal() {
  return useSelector<any, ModalContent>(state => state.modalState.content);
}
