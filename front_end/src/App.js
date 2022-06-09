import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import './App.css';

function App() {

    const [isMenuExpanded, setIsMenuExpanded] = useState(false);

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
                    <a style={{"position":"relative", "cursor":"pointer"}} onClick={() => setIsMenuExpanded(isMenuExpanded => !isMenuExpanded)}>
                        demo_user
                        <div style={isMenuExpanded? {"border":"1px solid black", "padding":"10px" ,"display":"flex", "flex-direction":"column", "position": "absolute", "minWidth":"200px", "textAlign": "left"} : {"display":"none"}}>
                            <Link to="create">Create</Link>
                            <Link to="likes">Likes</Link>
                            <Link to="collection">Collection</Link>
                        </div>
                    </a>
                </div>
            </nav>
            <div className="wrapper">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
