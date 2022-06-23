import { configureStore } from "@reduxjs/toolkit";
import likesReducer from "./likesSlice.js";
import loginReducer from "./loginSlice.js";

export const store = configureStore({
    reducer: {
        likes: likesReducer,
        login: loginReducer
    }
});
