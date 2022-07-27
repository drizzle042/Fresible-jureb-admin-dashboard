import { createSlice } from "@reduxjs/toolkit";

const state = JSON.parse(localStorage.getItem("jureb-employee-dashboard"));
const DropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    open: state?.dropdown?.open || false,
  },
  reducers: {
    saveDropdownPath(state, action) {
      return {
        ...state,
        open: action.payload,
      };
    },
    discardDropdownPath(state, action) {
      return {
        ...state,
        open: action.payload,
      };
    },
  },
});

export const DropDownAction = DropdownSlice.actions;
export default DropdownSlice;
