import { configureStore } from "@reduxjs/toolkit";
import { navSlice } from "./nav-slice";
import { favoriteSlice } from "./favorites-slice"
import { shoppingListSlice } from "./shoppingList-slice";




const store = configureStore({
    reducer: {
        nav: navSlice.reducer,
        favorites: favoriteSlice.reducer,
        shoppingList: shoppingListSlice.reducer
    }
});

export default store;