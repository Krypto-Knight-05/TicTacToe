import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 1000,
};


export const codeSlice = createSlice({
  name: "code", //name of slice
  initialState, //initialState : {value:1000}
  reducers: {
    change: (state, action) => { //action : logic
      state.value = action.payload;
    },
  },
});

const array = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

export const gridSlice = createSlice({
  name: "grid",
  initialState: array,
  reducers: {
    changeArray: (state, action)=>{
      state[action.payload.index] = action.payload.value;
    }
  }
})

const isTurn = false;

export const turnSlice = createSlice({
  name: "turn",
  initialState: isTurn,
  reducers: {
    changeTurn: (state)=>{
      return !state;
    },
    initialiseTurn: (state, action)=>{
      return action.payload;
    }
  }
})

const InitStatus = 'ongoing'

export const statusSlice = createSlice({
  name: "status",
  initialState: InitStatus,
  reducers: {
    changeStatus: (state, action)=>{
      return action.payload
    }
  }
})

export const { change } = codeSlice.actions;
export default codeSlice.reducer;

export const {changeArray} = gridSlice.actions
export const gridReducer = gridSlice.reducer;

export const {changeTurn, initialiseTurn} = turnSlice.actions;
export const turnReducer = turnSlice.reducer;

export const {changeStatus} = statusSlice.actions
export const statusReducer = statusSlice.reducer;