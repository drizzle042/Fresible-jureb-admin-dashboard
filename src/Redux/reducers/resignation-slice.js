import { createSlice } from "@reduxjs/toolkit";
import { resignationText } from "../texts/texts";

const resignationItems = JSON.parse(
  localStorage.getItem("jureb-employee-dashboard")
);

const ResignationSlice = createSlice({
  name: "resignation",
  initialState: {
    edit: resignationItems?.resignation?.edit || resignationText,
  },
  reducers: {
    editResignationForm(state, action) {
      return {
        ...state,
        edit: action.payload,
      };
    },
    deleteFormField(state) {
      return {
        ...state,
        edit: "",
      };
    },
  },
});

export const ResignationActions = ResignationSlice.actions;
export default ResignationSlice;
