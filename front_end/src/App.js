import { Link, Outlet } from "react-router-dom";
import './App.css';

function App() {
    return (
        <div className="App">
            <nav>
                <Link to="popular">Popular</Link>
                <Link to="new">New</Link>
                <Link to="random">Random</Link>
                <Link to="liked_palettes">Liked Palettes</Link>
                <Link to="create">Create</Link>
            </nav>
            <Outlet />
        </div>
    );
}

export default App;
