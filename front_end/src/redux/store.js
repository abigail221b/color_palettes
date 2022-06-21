import { configureStore } from "@reduxjs/toolkit";
import likesReducer from "./likesSlice.js";
import loggedInReducer from "./loggedInSlice.js";

export const store = configureStore({
    reducer: {
        likes: likesReducer,
        loggedIn: loggedInReducer
    }
});
