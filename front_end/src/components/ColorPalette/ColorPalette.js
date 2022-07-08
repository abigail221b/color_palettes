import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { like, unlike } from "../../redux/likesSlice.js";
import style from "./ColorPalette.module.css";
import LikeButton from "../LikeButton/LikeButton";
import TimeAgo from "timeago-react";
import classnames from "classnames";

function ColorPalette({ creator, handleDelete, colors, date_created, num_likes, isLikedByUser, isCreatedByUser }) {

    const [liked, setLiked] = useState(isLikedByUser);
    const [numLikes, setNumLikes] = useState(num_likes);
    const dispatch = useDispatch();
    const { isLoggedIn, username } = useSelector(state => state.login);

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
                { colors.map(color => <div className={ style.colorBlock } style={{ backgroundColor:`#${color}` }}></div>) }
            </div>
            <div className={ style.paletteDetail }>
                <div>
                    <div style={{ "fontSize": "medium"}}>{ creator }</div>
                    <div style={{ "fontSize": "small"}}>
                        <TimeAgo datetime={ date_created }/>
                    </div>
                </div>
                <LikeButton handleLike={ handleLike } numLikes={ numLikes } liked={ liked }/>
            </div>
        </div>
    );
}

export default ColorPalette;
