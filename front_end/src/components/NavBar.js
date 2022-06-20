import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar() {

    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const [isSmallMenuExpanded, setIsSmallMenuExpanded] = useState(false);

    return (
        <nav>
            <Link to="popular">
                <span className="brand">Color Palettes</span>
            </Link>

            <input id="bmenub" type="checkbox" className="show" onChange={() => setIsMenuExpanded(isMenuExpanded => !isMenuExpanded)}/>
            <label for="bmenub" className="burger pseudo button">Menu</label>

            <div className="menu">
                <Link to="popular">Popular</Link>
                <Link to="new">New</Link>
                <Link to="create">Create</Link>
                <Link to="likes">Likes</Link>
                <Link to="collection">Collection</Link>
            </div>
        </nav>
    );
}

export default NavBar;
