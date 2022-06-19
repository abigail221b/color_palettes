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

import { store } from "./redux/store";
import { Provider, dispatch } from "react-redux";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Provider store={ store }><App /></Provider> }>
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
