import { configureStore } from "@reduxjs/toolkit";
import likesReducer from "./likesSlice.js";

export const store = configureStore({
    reducer: {
        likes: likesReducer
    }
});
