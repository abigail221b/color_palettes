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
        }
    }
});

export const { login } = loginSlice.actions;

export default loginSlice.reducer;
