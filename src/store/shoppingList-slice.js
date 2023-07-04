import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    shoppingList: []
}

export const shoppingListSlice = createSlice({
name: 'shoppingList',
initialState,
reducers: {
        addIngredients (state, actions) {

        },
        removeIngredients (state, actions) {

        },
        clearTodos (state, actions) {

        }
    }
});

export const shoppingListActions = reducers.actions