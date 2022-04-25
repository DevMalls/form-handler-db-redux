import { configureStore } from "@reduxjs/toolkit";
import inputReducer from "./inputSlice";

const store = configureStore({
    reducer: inputReducer
});

export default store;   