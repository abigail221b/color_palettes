import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function NavBar() {

    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const [isSmallMenuExpanded, setIsSmallMenuExpanded] = useState(false);
    const isLoggedIn = useSelector(state => state.loggedIn.value);

    const subMenu_style = {
        "position" : "absolute",
        "right" : "0",
        "minWidth": "200px",
        "padding": "10px"
    };

    const subMenu = (
        <div className="card" style={subMenu_style}>
            <header>Hello!</header>
            <footer style={{"display":"flex", "flexDirection":"column","gap":"15px"}}>
                <Link to="create">Create</Link>
                <Link to="likes">Likes</Link>
                <Link to="collection">Collection</Link>
            </footer>
        </div>
    );

    const loggedIn_menu = (
        <>
            {isMenuExpanded?
                <>
                    <Link to="popular">Popular</Link>
                    <Link to="new">New</Link>
                    <Link to="create">Create</Link>
                    <Link to="likes">Likes</Link>
                    <Link to="collection">Collection</Link>
                </> :
                <>
                    <Link to="popular">Popular</Link>
                    <Link to="new">New</Link>
                    <button style={{"backgroundColor":"yellow"}} onClick={() => setIsSmallMenuExpanded(isSmallMenuExpanded => !isSmallMenuExpanded)}>
                        submenu
                    </button>
                    {isSmallMenuExpanded? subMenu : ""}
                </>
            }
        </>
    );

    const loggedOut_menu = (
        <>
            <span class="button" style={{ "backgroundColor": "yellow" }}><Link to="login">Log in</Link></span>
            <span class="button" style={{ "backgroundColor": "yellow" }}><Link to="register">Sign up</Link></span>
        </>
    );


    return (
        <nav>
            <Link to="popular">
                <span className="brand">Color Palettes</span>
            </Link>

            <input id="bmenub" type="checkbox" className="show" onChange={() => setIsMenuExpanded(isMenuExpanded => !isMenuExpanded)}/>
            <label for="bmenub" className="burger pseudo button">Menu</label>

            <div className="menu">

                { isLoggedIn? loggedIn_menu : loggedOut_menu}
            </div>
        </nav>
    );
}

export default NavBar;
