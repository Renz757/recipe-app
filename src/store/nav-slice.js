import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    searchInput: "",
    cuisine: ""
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        toggleNav(state) {
            state.isOpen ? state.isOpen = false : state.isOpen = true
        },
        closeNav(state) {
            state.isOpen = false
        },
        updateSearchInput (state, action) {
            state.searchInput = action.payload
        },
        updateCuisineInput (state, action) {
            state.cuisine = action.payload
        }
    }

});

export const navActions = navSlice.actions
