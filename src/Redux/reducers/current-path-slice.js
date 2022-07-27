import { createSlice } from "@reduxjs/toolkit";

const path = JSON.parse(localStorage.getItem("jureb-employee-dashboard"));
const PathSlice = createSlice({
  name: "currentPath",
  initialState: {
    path: path?.currentPath?.path || "",
  },
  reducers: {
    saveCurrentPath(state, action) {
      return {
        ...state,
        path: action.payload,
      };
    },
  },
});

export const PathActions = PathSlice.actions;
export default PathSlice;
