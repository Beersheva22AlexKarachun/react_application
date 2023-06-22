import { configureStore } from "@reduxjs/toolkit";
import { directionReducer } from "./slices/flexDirectionSlice";
import { lifeCountReducer } from "./slices/lifeCountSlice";
import { cellSizeReducer } from "./slices/cellSizeSlice";
import { useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        directionState: directionReducer,
        lifeCountState: lifeCountReducer,
        cellSizeState: cellSizeReducer,
    }
})

export function useSelectorDirection() {
    return useSelector<any, any>(state => state.directionState.direction)
}
export function useSelectorCount() {
    return useSelector<any, number>(state => state.lifeCountState.count)
}
export function useSelectorSize() {
    return useSelector<any, number>(state => state.cellSizeState.cellSize)
}