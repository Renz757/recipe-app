import { createSlice, current } from "@reduxjs/toolkit";
import { db } from "../firebase_setup/firebase";
import { addDoc, collection } from "firebase/firestore";

const colRef = collection(db, 'shoppingList');

const initialState = {
    shoppingList: []
}

export const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {
        initialize(state, action) {
            state.shoppingList = action.payload
        },
        addIngredients(state, action) {
            const currentState = current(state.shoppingList)
            const existingShoppingListIndex = currentState.findIndex(
                (index) => index.id === action.payload.id
            );

            const existingShoppingList = currentState[existingShoppingListIndex];

            if (existingShoppingList) {
                alert('Ingredients Already in Shopping List')
            } else {
                addDoc(colRef, { ...action.payload });
            }
        },
        removeIngredients(state, actions) {

        },
        clearTodos(state, actions) {

        },
        updateIsComplete(state, actions) {

        }
    }
});

export const shoppingListActions = shoppingListSlice.actions