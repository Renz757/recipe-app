import { createSlice, current } from "@reduxjs/toolkit";
import { db } from "../firebase_setup/firebase";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";

const colRef = collection(db, 'shoppingList');

const initialState = {
    shoppingList: [],
    notificationState: {
        isShowing: false,
        alreadyInList: false
    }
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
                state.notificationState.isShowing = false
                return
            } else {
                addDoc(colRef, { ...action.payload });
                state.notificationState.isShowing = true
            }
        },
        removeIngredients(state, action) {
            const docRef = doc(db, "shoppingList", action.payload)
            deleteDoc(docRef)
        },
        setNotification(state, action) {
            state.notificationState.isShowing = action.payload
        },

        clearTodos(state, action) {

        },
        updateIsComplete(state, action) {

        }
    }
});

export const shoppingListActions = shoppingListSlice.actions