import { Link, Outlet } from "react-router-dom";
import './App.css';

function App() {
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
                    <Link to="random">Random</Link>
                    <Link to="liked_palettes">Liked Palettes</Link>
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
