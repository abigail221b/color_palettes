import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: true,
    username: null
}

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            state = {
                value: action.payload.value,
                username: action.payload.username
            }
        }
    }
});

export const { login } = loginSlice.actions;

export default loginSlice.reducer;
