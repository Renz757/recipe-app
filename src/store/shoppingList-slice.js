import { createSlice, current } from "@reduxjs/toolkit";
import { db } from "../firebase_setup/firebase";
import { addDoc, collection, doc, deleteDoc } from "firebase/firestore";

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
            const colRef = collection(db, "users", `${action.payload.uid}`, 'shoppingList');

            if (existingShoppingList) {
                state.notificationState.alreadyInList = true
                state.notificationState.isShowing = false
                console.log(state.notificationState.alreadyInList)
                alert('Ingredients Already in Shopping List')
                return
            } else {
                addDoc(colRef, {
                    id: action.payload.id,
                    title: action.payload.title,
                    ingredients: action.payload.ingredients,
                    isComplete: action.payload.isComplete
                });
                state.notificationState.isShowing = true
            }
        },
        removeIngredients(state, action) {
            const docRef = doc(db, "users", `${action.payload.uid}`, 'shoppingList', `${action.payload.id}`)
            deleteDoc(docRef)
        },
        resetNotification(state, action) {
            state.notificationState.isShowing = false
            state.notificationState.alreadyInList = false
        },
        setNotification(state, action) {
            state.notificationState.isShowing = true
        },

        clearTodos(state, action) {

        },
        updateIsComplete(state, action) {

        }
    }
});

export const shoppingListActions = shoppingListSlice.actions