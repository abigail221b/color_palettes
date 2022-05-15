import { useEffect, useState } from "react";
import ColorPalette from "../components/ColorPalette.js";

const SORT = {
    ALL_TIME: "all",
    THIS_YEAR: "year",
    THIS_MONTH: "month",
    THIS_WEEK: "week"
};

function Popular() {

    const [palettes, setPalettes] = useState([]);
    const [filter, setFilter] = useState(SORT.ALL_TIME);
    const [page, setPage] = useState(1);

    function handleChange(e) {
        switch(e.target.value) {
            case SORT.THIS_YEAR:
                setFilter(SORT.THIS_YEAR);
                break;
            case SORT.THIS_MONTH:
                setFilter(SORT.THIS_MONTH);
                break;
            case SORT.THIS_WEEK:
                setFilter(SORT.THIS_WEEK);
                break;
            default:
                setFilter(SORT.ALL_TIME);
        }
    }

    useEffect(() => {
        fetch(`/palettes/popular/${filter}/${ page }`)
        .then(res => res.json())
        .then(data => setPalettes(data));
    }, [filter, page]);

    return (
        <div className="Popular" style={{  maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}>
            <h1>Popular Palettes</h1>
            <select name="filer" onChange={ handleChange } style={{ width: "200px" }}>
                <option value={ SORT.ALL_TIME }>All Time</option>
                <option value={ SORT.THIS_YEAR }>This Year</option>
                <option value={ SORT.THIS_MONTH }>This Month</option>
                <option value={ SORT.THIS_WEEK }>This Week</option>
            </select>
            <div className="flex one two-500 three-700 four-1000">
                {palettes.map(palette => <div style={{ padding:"10px" }}>
                                            <ColorPalette
                                                key={ palette.color0 + palette.color1 + palette.color2 + palette.color3 + palette.color4 }
                                                colors={[palette.color0, palette.color1, palette.color2, palette.color3, palette.color4]}
                                                date_created = { palette.date_created}
                                                num_likes = { palette.num_likes }/></div> )}
            </div>
        </div>
    );

}

export default Popular;
