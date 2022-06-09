import { Link, Outlet } from "react-router-dom";
import { useEffect } from "react";
import './App.css';

function App() {

    fetch("/user/demo_user/palettes/likes")
    .then(res => res.json())
    .then(palettes => {
        let store = palettes.map(palette => {
            return palette.color0 + palette.color1 + palette.color2 + palette.color3 + palette.color4;
        });
        localStorage.setItem("palettes", JSON.stringify(store));
    });

    return (
        <div className="App">
            <nav>
                <Link to="popular">
                    <span className="brand">Color Palettes</span>
                </Link>

                <input id="bmenub" type="checkbox" className="show" />
                <label for="bmenub" className="burger pseudo button">Menu</label>

                <div className="menu">
                    <Link to="popular">Popular</Link>
                    <Link to="new">New</Link>
                    <Link to="likes">Likes</Link>
                    <Link to="create"><button>Create</button></Link>
                </div>
            </nav>
            <div className="wrapper">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
