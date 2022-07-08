import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/loginSlice";
import { clearPalettes } from "../../redux/likesSlice";
import { useNavigate } from "react-router-dom";
import SubMenu from "../SubMenu/SubMenu";

function NavBar() {

    const [isMenuExpanded, setIsMenuExpanded] = useState(false);
    const [isSmallMenuExpanded, setIsSmallMenuExpanded] = useState(false);
    const { isLoggedIn, username } = useSelector(state => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loggedIn_menu = (
        <>
            {isMenuExpanded?
                <>
                    <Link to="popular">Popular</Link>
                    <Link to="new">New</Link>
                    <Link to="create">Create</Link>
                    <Link to="likes">Likes</Link>
                    <Link to={`/palettes/user/${ username }`}>Collection</Link>
                    <button onClick={() => {
                        dispatch(logout());
                        dispatch(clearPalettes());
                        navigate("../popular", { replace: true });
                    }}>Logout</button>
                </> :
                <>
                    <Link to="popular">Popular</Link>
                    <Link to="new">New</Link>
                    <button style={{"backgroundColor":"yellow"}} onClick={() => setIsSmallMenuExpanded(isSmallMenuExpanded => !isSmallMenuExpanded)}>
                        submenu
                    </button>
                    {isSmallMenuExpanded? <SubMenu /> : ""}
                </>
            }
        </>
    );

    const loggedOut_menu = (
        <>
            <Link to="popular">Popular</Link>
            <Link to="new">New</Link>
            <Link to="login"><span class="button" style={{ "backgroundColor": "yellow" }}>Log in</span></Link>
            <Link to="signup"><span class="button" style={{ "backgroundColor": "yellow" }}>Sign up</span></Link>
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
