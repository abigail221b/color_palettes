import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Popular from "./pages/Popular";
import New from "./pages/New";
import Random from "./pages/Random";
import Liked from "./pages/Liked";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <App /> }>
                    <Route index element={<Popular />} />
                    <Route path="popular" element={<Popular />} />
                    <Route path="new" element={<New />} />
                    <Route path="random" element={<Random />} />
                    <Route path="liked_palettes" element={<Liked />} />
                    <Route path="create" element={<Create />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
