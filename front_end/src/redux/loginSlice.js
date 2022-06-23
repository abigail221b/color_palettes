import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    username: null
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            return {
                isLoggedIn: action.payload.isLoggedIn,
                username: action.payload.username
            }
        },
        logout: (state) => {
            return {
                isLoggedIn: false,
                username: null
            }
        }
    }
});

export const { login, logout } = loginSlice.actions;

export default loginSlice.reducer;
