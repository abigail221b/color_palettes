import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { initalizePalettes } from "./redux/likesSlice.js";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import './App.css';

function App() {

    // Fetch user likes from database save to redux store
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("/palettes/user/demoUser121/likes")
        .then(res => res.json())
        .then(palettes => {
            dispatch(initalizePalettes(palettes));
        })
    }, []);

    return (
        <div className="App">
            <div className="wrapper">
                <NavBar />
                <Outlet />
            </div>
        </div>
    );
}

export default App;
