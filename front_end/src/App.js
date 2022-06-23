import NavBar from "./components/NavBar";
import { useEffect } from "react";
import { initalizePalettes } from "./redux/likesSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import './App.css';

function App() {
    const { isLoggedIn, username } = useSelector(state => state.login);

    // Fetch user likes from database save to redux store
    const dispatch = useDispatch();
    useEffect(() => {
        if(isLoggedIn) {
            fetch(`/palettes/user/${ username }/likes`)
            .then(res => res.json())
            .then(palettes => {
                dispatch(initalizePalettes(palettes));
            })
        }
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
