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
            <div className={ style.greeting }>Hello, { username }!</div>
            <div className={ style.link }><Link to="create">Create</Link></div>
            <div className={ style.link }><Link to="likes">Likes</Link></div>
            <div className={ style.link }><Link to={`/palettes/user/${ username }`}>Collection</Link></div>
            <button className={ style.logoutBtn } onClick={() => {
                dispatch(logout());
                dispatch(clearPalettes());
                navigate("../popular", { replace: true });
            }}>Logout</button>
        </div>
    );
}

export default SubMenu;
