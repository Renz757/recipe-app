import { createSlice, current } from "@reduxjs/toolkit";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase_setup/firebase";
import { useSelector } from "react-redux";



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
            const colRef = collection(db, "users", `${action.payload.uid}`, "favorites");

            if (existingFavorite) {
                const docRef = doc(db, "users", `${action.payload.uid}`, "favorites", existingFavorite.dbID)
                deleteDoc(docRef)
            } else {
                addDoc(colRef, {
                    id: action.payload.id,
                    title: action.payload.title,
                    image: action.payload.image,
                    isFavorite: action.payload.isFavorite
                })
            }
        }
    }
});

export const favActions = favoriteSlice.actions
