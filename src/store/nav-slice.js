import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    searchInput: ""
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
        }
    }

});

export const navActions = navSlice.actions
