import { configureStore } from "@reduxjs/toolkit";
import PathSlice from "./reducers/current-path-slice";
import DropdownSlice from "./reducers/dropdown-open-slice";
import ResignationSlice from "./reducers/resignation-slice";

const store = configureStore({
  reducer: {
    resignation: ResignationSlice.reducer,
    currentPath: PathSlice.reducer,
    dropdown: DropdownSlice.reducer,
  },
});

export default store;
