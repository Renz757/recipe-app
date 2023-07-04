import { createSlice, current } from "@reduxjs/toolkit";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
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
        updateFavorite(state, action) {
            const currentState = current(state.favoriteRecipes)
            const existingFavoriteIndex = currentState.findIndex(
                (index) => index.id === action.payload.id
            );
            
            const existingFavorite = currentState[existingFavoriteIndex];

            if (existingFavorite) {
                const docRef = doc(db, 'favorites', existingFavorite.dbID)
                deleteDoc(docRef)
            } else {
                addDoc(colRef, { ...action.payload })
            }
        }
    }
});

export const favActions = favoriteSlice.actions
