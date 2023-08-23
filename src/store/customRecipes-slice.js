import { createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase_setup/firebase";

const initialState = {
    customRecipeList: [],
    customRecipe: {},
    showModal: false
}

export const customRecipeSlice = createSlice({
    name: 'customRecipe',
    initialState,
    reducers: {
        //gets state from db once app loads
        initialize(state, action) { state.customRecipeList = action.payload },
        submitForm(state, action) {
            const colRef = collection(db, "users", `${action.payload.uid}`, 'customRecipes')
            addDoc(colRef, { ...action.payload.recipeData })
            console.log(action.payload.recipeData)
        },
        deleteCustomRecipe(state, action) {

            //todo: delete image from frie store
            const docRef = doc(db, "users", `${action.payload.uid}`, "customRecipes", action.payload.id)
            deleteDoc(docRef)
            state.showModal = false
        },
        modalhandler(state) {
            state.showModal = !state.showModal
        }

    }
});

export const customRecipeActions = customRecipeSlice.actions

