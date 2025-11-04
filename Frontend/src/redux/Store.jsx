import { configureStore } from "@reduxjs/toolkit";
import codeReducer, { gridReducer, statusReducer, turnReducer } from "./Slice";

const store = configureStore({
  reducer: {
    code: codeReducer, //slice name as key and its reducers in value
    grid: gridReducer,
    turn: turnReducer,
    status: statusReducer
  },
});

export default store