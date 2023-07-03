import { configureStore } from "@reduxjs/toolkit";
import { navSlice } from "./nav-slice";
import { favoriteSlice } from "./favorites-slice"




const store = configureStore({
    reducer: {
        nav: navSlice.reducer,
        favorites: favoriteSlice.reducer
    }
});

export default store;