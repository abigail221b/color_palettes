import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { like, unlike } from "../../redux/likesSlice.js";
import { Link } from "react-router-dom";
import style from "./ColorPalette.module.css";
import LikeButton from "../LikeButton/LikeButton";
import TimeAgo from "timeago-react";
import classnames from "classnames";

function ColorPalette({ creator, handleDelete, colors, date_created, num_likes, isLikedByUser, isCreatedByUser }) {

    const [liked, setLiked] = useState(isLikedByUser);
    const [numLikes, setNumLikes] = useState(num_likes);
    const dispatch = useDispatch();
    const { isLoggedIn, username } = useSelector(state => state.login);
    const [focus, setFocus] = useState(null);
    const [labelText, setLabelText] = useState(null);

    // Once user logs out, clear highlighted like buttons
    useEffect(() => {
        if(!isLoggedIn)
            setLiked(false);
    }, [isLoggedIn]);

    const handleLike = () => {
        if(isLoggedIn) {
            if(liked) {
                setNumLikes(numLikes => numLikes-1);
                fetch(`/palettes/${colors[0]}/${colors[1]}/${colors[2]}/${colors[3]}/${colors[4]}/?username=${ username }&like=false`, {
                    method: "PUT"
                });
                dispatch(unlike({ color0: colors[0], color1: colors[1], color2: colors[2], color3: colors[3], color4: colors[4] }));
            } else {
                setNumLikes(numLikes => numLikes+1);
                fetch(`/palettes/${colors[0]}/${colors[1]}/${colors[2]}/${colors[3]}/${colors[4]}/?username=${ username }&like=true`, {
                    method: "PUT"
                });
                dispatch(like({ color0: colors[0], color1: colors[1], color2: colors[2], color3: colors[3], color4: colors[4] }));
            }
            setLiked(!liked);
        }
    }

    return (
        <div className={ classnames(style.colorPalette, "card") }>
            <div className={ style.colorsView } >
                { colors.map((color, index) =>
                    <label className={ style.colorLabel } style={{ width: focus===index? "150%" : "100%", backgroundColor: `#${color}`}}
                           onMouseEnter={() => { setFocus(index); setLabelText(`#${color}`) }}
                           onMouseLeave={() => { setFocus(null); setLabelText(null) }}
                           onClick={() => navigator.clipboard.writeText(color).then(res => setLabelText("copied!"))}>
                       {focus===index? labelText : null}
                    </label>)
                }
            </div>
            {isCreatedByUser? <span style={{ cursor: "pointer", position: "absolute", top: "0", right: "0", margin: "5px"}} onClick={ () => handleDelete(colors[0],colors[1],colors[2],colors[3],colors[4]) }>
                <div><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg></div>
            </span> : null}
            <div className={ style.paletteDetail }>
                <div>
                    <div style={{ "fontSize": "medium", textDecoration: "underline"}}><Link to={`/palettes/user/${ creator }`}>{ creator }</Link></div>
                    <div style={{ "fontSize": "small"}}>
                        <TimeAgo datetime={ date_created } live={ false }/>
                    </div>
                </div>
                <LikeButton handleLike={ handleLike } numLikes={ numLikes } liked={ liked }/>
            </div>
        </div>
    );
}

export default ColorPalette;
