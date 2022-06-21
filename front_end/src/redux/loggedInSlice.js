import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
}

export const loggedInSlice = createSlice({
    name: "loggedIn",
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.value = !state.value;
        }
    }
});

export const { loggedIn } = loggedInSlice.actions;

export default loggedInSlice.reducer;
