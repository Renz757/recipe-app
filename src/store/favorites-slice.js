import { createSlice } from "@reduxjs/toolkit";
import { onSnapshot, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase_setup/firebase";

const colRef = collection(db, "favorites");

const initialState = {
    favoriteRecipes: []
}



export const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        initialize(state, action) {
            state.favoriteRecipes = action.payload
        },
        addFavorite(state, action) {
            const existingFavoriteIndex = state.favoriteRecipes.findIndex(
                (index) => index.id === action.payload
            );

            const existingFavorite = favoriteRecipes[existingFavoriteIndex];

            if (!existingFavorite) addDoc(colRef, ...action.payload)
        },
        removeFavortie(state) {
            const existingFavoriteIndex = state.favoriteRecipes.findIndex(
                (index) => index.id === action.payload
            );

            const existingFavorite = favoriteRecipes[existingFavoriteIndex];

            const docRef = doc(db, 'favorites', existingFavorite.dbID)
            deleteDoc(docRef)
        }
    }
});

export const favActions = favoriteSlice.actions
