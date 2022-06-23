import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { like, unlike } from "../redux/likesSlice.js";
import LikeButton from "./LikeButton";

function ColorPalette({ creator, colors, date_created, num_likes, isLikedByUser }) {

    const [liked, setLiked] = useState(isLikedByUser);
    const [numLikes, setNumLikes] = useState(num_likes);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login.value);

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

    const formatDate = (date) => {
        const dateObj = new Date(date);
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth();
        let day = dateObj.getDate();
        let hour = dateObj.getHours();
        let minute = dateObj.getMinutes();
        let second = dateObj.getSeconds();

        const now = new Date();
        let yearNow = now.getFullYear();
        let monthNow = now.getMonth();
        let dayNow = now.getDate();
        let hourNow = now.getHours();
        let minuteNow = now.getMinutes();
        let secondNow = now.getSeconds();

        if(yearNow - year === 0)
            if(monthNow - month === 0)
                if(dayNow - day === 0)
                    if(hourNow - hour === 0)
                        if(minuteNow - minute === 0)
                            return "now";
                        else return `${ minuteNow - minute } ${ minuteNow - minute === 1? "minute" : "minutes"} ago`;
                    else return `${ hourNow - hour } ${ hourNow - hour === 1? "hour" : "hours"} ago`;
                else return `${ dayNow - day } ${ dayNow - day === 1? "day" : "days"} ago`;
            else return `${ monthNow - month } ${ monthNow - month === 1? "month" : "months"} ago`;
        else return `${ yearNow - year } ${ yearNow - year === 1? "year" : "years"} ago`;
    }

    const handleLike = () => {
        if(isLoggedIn) {
            if(liked) {
                setNumLikes(numLikes => numLikes-1);
                fetch(`/palettes/${colors[0]}/${colors[1]}/${colors[2]}/${colors[3]}/${colors[4]}/?username=demoUser121&like=false`, {
                    method: "PUT"
                });
                dispatch(unlike({ color0: colors[0], color1: colors[1], color2: colors[2], color3: colors[3], color4: colors[4] }));
            } else {
                setNumLikes(numLikes => numLikes+1);
                fetch(`/palettes/${colors[0]}/${colors[1]}/${colors[2]}/${colors[3]}/${colors[4]}/?username=demoUser121&like=true`, {
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
                    <div style={{ "fontSize": "small"}}>{ formatDate(date_created) }</div>
                </div>
                <LikeButton handleLike={ handleLike } numLikes={ numLikes } liked={ liked }/>
            </div>
        </div>
    );
}

export default ColorPalette;
