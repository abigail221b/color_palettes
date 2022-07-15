import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/loginSlice";
import { clearPalettes } from "../../redux/likesSlice";
import { useNavigate } from "react-router-dom";
import SubMenu from "../SubMenu/SubMenu";
import style from "./NavBar.module.css";
import classnames from "classnames";

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
                    <button className={ style.button } onClick={() => {
                        dispatch(logout());
                        dispatch(clearPalettes());
                        navigate("../popular", { replace: true });
                    }}>Logout</button>
                </> :
                <>
                    <Link to="popular">Popular</Link>
                    <Link to="new">New</Link>
                    <span style={{ cursor: "pointer"}} onClick={() => setIsSmallMenuExpanded(isSmallMenuExpanded => !isSmallMenuExpanded)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="-4 -4 25 25" width="25"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </span>
                    {isSmallMenuExpanded? <SubMenu /> : ""}
                </>
            }
        </>
    );

    const loggedOut_menu = (
        <>
            <Link to="popular">Popular</Link>
            <Link to="new">New</Link>
            <Link to="login"><span className= { classnames(style.btn, "button") }>Log in</span></Link>
            <Link to="signup"><span className={ classnames(style.btn, "button") }>Sign up</span></Link>
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
