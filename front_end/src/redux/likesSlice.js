import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    palettes: []
}

// Fetch user likes before App component renders
fetch("/user/demo_user/palettes/likes")
.then(res => res.json())
.then(palettes => {
    initialState.palettes = palettes;
});

export const likesSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {
        like: (state, action) => {
            state.palettes = [...state, action.payload]
        },
        unlike: (state, action) => {
            state.palettes = state.palettes.filter(palette => palette.color0 !== action.payload.color0 || palette.color1 !== action.payload.color1 || palette.color2 !== action.payload.color2 || palette.color3 !== action.payload.color3 || palette.color4 !== action.payload.color4)
        },
        initalizePalettes: (state, action) => {
            state.palettes = action.payload;
        }
    }
});

export const { like, unlike, initalizePalettes } = likesSlice.actions;

export default likesSlice.reducer;
