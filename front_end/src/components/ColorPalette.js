import { useState, useEffect } from "react";

function ColorPalette({ colors, date_created, num_likes}) {

    const [liked, setLiked] = useState(() => {
        let saved = localStorage.getItem("palettes");
        if(saved) {
            let liked_palettes = JSON.parse(saved);
            let thisPaletteID = colors[0] + colors[1] + colors[2] + colors[3] + colors[4];
            let found = liked_palettes.find(paletteID => paletteID === thisPaletteID);
            if(found) return true;
        }
        return false;
    });
    const [numLikes, setNumLikes] = useState(num_likes);

    const colorPalette_style = {
        height: "225px",
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
        height: "70px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 10px"
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
        if(liked) {
            setNumLikes(numLikes => numLikes-1);
            fetch(`/user/unlike/?username=demo_user&color0=${colors[0]}&color1=${colors[1]}&color2=${colors[2]}&color3=${colors[3]}&color4=${colors[4]}`, {
                method: "PUT"
            });
        } else {
            setNumLikes(numLikes => numLikes+1);
            fetch(`/user/like/?username=demo_user&color0=${colors[0]}&color1=${colors[1]}&color2=${colors[2]}&color3=${colors[3]}&color4=${colors[4]}`, {
                method: "PUT"
            });
        }
        setLiked(!liked);
    }

    useEffect(() => {
        if(!localStorage.getItem("palettes"))
            localStorage.setItem("palettes", JSON.stringify([]));

        let saved = localStorage.getItem("palettes");
        let liked_palettes = JSON.parse(saved);
        let thisPaletteID = colors[0] + colors[1] + colors[2] + colors[3] + colors[4];

        if(liked)
            liked_palettes = [...liked_palettes, thisPaletteID];
        else
            liked_palettes = liked_palettes.filter(paletteID => paletteID !== thisPaletteID);

        localStorage.setItem("palettes", JSON.stringify(liked_palettes));
    }, [liked]);

    return (
        <div className="ColorPalette card" style={ colorPalette_style }>
            <div className="colorView" style={ colorView_style }>
                { colors.map(color => <div style={{ ...colorBlock_style, backgroundColor:`#${color}` }}></div>) }
            </div>
            <div className="info" style={ paletteInfo_style }>
                <div>{ formatDate(date_created) }</div>
                <button style={{ backgroundColor: liked? "pink" : "white", border: "2px solid pink" }} onClick={ handleLike }>&#9829; { numLikes }</button>
            </div>
        </div>
    );
}

export default ColorPalette;
