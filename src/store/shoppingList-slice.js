import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    shoppingList: []
}

export const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        initialize(state, action) {
            state.shoppingList = action.payload
            console.log(state.shoppingList)
        },
        addIngredients(state, actions) {

        },
        removeIngredients(state, actions) {

        },
        clearTodos(state, actions) {

        }
    }
});

export const shoppingListActions = shoppingListSlice.actions