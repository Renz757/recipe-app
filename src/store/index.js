import { configureStore } from "@reduxjs/toolkit";
import { navSlice } from "./nav-slice";
import { favoriteSlice } from "./favorites-slice"
import { shoppingListSlice } from "./shoppingList-slice";
import { customRecipeSlice } from "./customRecipes-slice";




const store = configureStore({
    reducer: {
        nav: navSlice.reducer,
        favorites: favoriteSlice.reducer,
        shoppingList: shoppingListSlice.reducer,
        customRecipe: customRecipeSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;