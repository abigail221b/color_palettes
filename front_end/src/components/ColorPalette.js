import { useState } from "react";

function ColorPalette({ colors, date_created, num_likes}) {

    const [liked, setLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(num_likes);

    const colorPalette_style = {
        height: "225px",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        padding: "10px"
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
        height: "50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    };

    const formatDate = (date) => {
        const dateObj = new Date(date);
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth();
        let day = dateObj.getDay();
        let hour = dateObj.getHours();
        let minute = dateObj.getMinutes();
        let second = dateObj.getSeconds();

        const now = new Date();
        let yearNow = now.getFullYear();
        let monthNow = now.getMonth();
        let dayNow = now.getDay();
        let hourNow = now.getHours();
        let minuteNow = now.getMinutes();
        let secondNow = now.getSeconds();

        if(yearNow - year == 0)
            if(monthNow - month == 0)
                if(dayNow - day == 0)
                    if(hourNow - hour == 0)
                        if(minuteNow - minute == 0)
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
        } else {
            setNumLikes(numLikes => numLikes+1);
        }
        setLiked(!liked);
    }

    return (
        <div className="ColorPalette" style={ colorPalette_style }>
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
