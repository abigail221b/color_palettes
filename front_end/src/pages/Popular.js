import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ColorPalette from "../components/ColorPalette.js";

const FILTER = {
    ALL_TIME: "all",
    THIS_YEAR: "year",
    THIS_MONTH: "month",
    THIS_WEEK: "week"
};

function Popular() {

    const [palettes, setPalettes] = useState([]);
    const [filter, setFilter] = useState(FILTER.ALL_TIME);
    const [page, setPage] = useState(1);
    const likedPalettes = useSelector(state => state.likes.palettes);
    const isLoggedIn = useSelector(state => state.isLoggedIn.value);

    function handleChange(e) {
        switch(e.target.value) {
            case FILTER.THIS_YEAR:
                setFilter(FILTER.THIS_YEAR);
                break;
            case FILTER.THIS_MONTH:
                setFilter(FILTER.THIS_MONTH);
                break;
            case FILTER.THIS_WEEK:
                setFilter(FILTER.THIS_WEEK);
                break;
            default:
                setFilter(FILTER.ALL_TIME);
        }
    }

    useEffect(() => {
        fetch(`/palettes/popular/?filter=${filter}&limit=15&page=${ page }`)
        .then(res => res.json())
        .then(data => setPalettes(data));
    }, [filter, page]);

    return (
        <div className="Popular" style={{  maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}>
            <h1>Popular Palettes</h1>
            <select name="filer" onChange={ handleChange } style={{ width: "200px" }}>
                <option value={ FILTER.ALL_TIME }>All Time</option>
                <option value={ FILTER.THIS_YEAR }>This Year</option>
                <option value={ FILTER.THIS_MONTH }>This Month</option>
                <option value={ FILTER.THIS_WEEK }>This Week</option>
            </select>
            <div className="flex one two-500 three-700 four-1000">
                {palettes.map(palette => <div style={{ padding:"10px" }}>
                                            <ColorPalette
                                                key={ palette.color0 + palette.color1 + palette.color2 + palette.color3 + palette.color4 }
                                                creator={ palette.username }
                                                colors={[palette.color0, palette.color1, palette.color2, palette.color3, palette.color4]}
                                                date_created = { palette.date_created}
                                                num_likes = { palette.num_likes }
                                                isLikedByUser = { isLoggedIn && likedPalettes.filter(likedPalette => likedPalette.color0 === palette.color0 && likedPalette.color1 === palette.color1 && likedPalette.color2 === palette.color2 && likedPalette.color3 === palette.color3 && likedPalette.color4 === palette.color4).length > 0 } />
                                         </div> )}
            </div>
        </div>
    );

}

export default Popular;
