import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        toggleNav(state) {
            state.isOpen ? state.isOpen = false : state.isOpen = true
        }
    }

});

export const navActions = navSlice.actions

const store = configureStore({ reducer: navSlice.reducer });

export default store;