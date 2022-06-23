import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { like, unlike } from "../redux/likesSlice.js";
import LikeButton from "./LikeButton";
import TimeAgo from "timeago-react";

function ColorPalette({ creator, colors, date_created, num_likes, isLikedByUser }) {

    const [liked, setLiked] = useState(isLikedByUser);
    const [numLikes, setNumLikes] = useState(num_likes);
    const dispatch = useDispatch();
    const { isLoggedIn, username } = useSelector(state => state.login);

    const colorPalette_style = {
        height: "235px",
        width: "100%",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.14) , 0px 3px 1px -2px rgba(0,0,0,0.12) , 0px 1px 5px 0px rgba(0,0,0,0.2) ",
        border: "none"
    };

    const colorView_style = {
        width: "100%",
        height: "100%",
        display: "flex"
    };

    const colorBlock_style = {
        width: "100%",
        height: "100%"
    };

    const paletteInfo_style = {
        width: "100%",
        height: "75px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 15px"
    };

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
        <div className="ColorPalette card" style={ colorPalette_style }>
            <div className="colorView" style={ colorView_style }>
                { colors.map(color => <div style={{ ...colorBlock_style, backgroundColor:`#${color}` }}></div>) }
            </div>
            <div className="info" style={ paletteInfo_style }>
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
