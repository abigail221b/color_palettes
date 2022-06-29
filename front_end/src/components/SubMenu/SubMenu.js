import classnames from "classnames";
import style from "./SubMenu.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/loginSlice";
import { clearPalettes } from "../../redux/likesSlice";

function SubMenu() {

    const { username } = useSelector(state => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className={ style.subMenu }>
            <header>Hello, { username }!</header>
                <div><Link to="create">Create</Link></div>
                <div><Link to="likes">Likes</Link></div>
                <div><Link to="collection">Collection</Link></div>
                <button onClick={() => {
                    dispatch(logout());
                    dispatch(clearPalettes());
                    navigate("../popular", { replace: true });
                }}>Logout</button>
        </div>
    );
}

export default SubMenu;
