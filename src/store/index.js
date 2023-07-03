import { configureStore } from "@reduxjs/toolkit";
import { navSlice } from "./nav-slice";




const store = configureStore({ reducer: navSlice.reducer });

export default store;