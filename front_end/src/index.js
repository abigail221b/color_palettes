import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Popular from "./pages/Popular";
import New from "./pages/New";
import Liked from "./pages/Likes";
import Collection from "./pages/Collection";

// Fetch user likes before App component renders
fetch("/user/demo_user/palettes/likes")
.then(res => res.json())
.then(palettes => {
    let store = palettes.map(palette => {
        return palette.color0 + palette.color1 + palette.color2 + palette.color3 + palette.color4;
    });
    localStorage.setItem("palettes", JSON.stringify(store));
});

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <App /> }>
                    <Route index element={<Popular />} />
                    <Route path="popular" element={<Popular />} />
                    <Route path="new" element={<New />} />
                    <Route path="likes" element={<Liked />} />
                    <Route path="create" element={<Create />} />
                    <Route path="collection" element={<Collection />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
