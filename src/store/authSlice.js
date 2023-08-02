import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase_setup/firebase";

const initialState = {
    user: null
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        }
    }
})

export const authActions = authSlice.actions