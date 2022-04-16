import { useEffect, useState } from "react";

const TIME_FILTER = {
    ALL_TIME: "all_time",
    THIS_YEAR: "this_year",
    THIS_MONTH: "this_month",
    THIS_WEEK: "this_week"
};

function Popular() {

    const [palettes, setPalettes] = useState([]);
    const [filter, setFilter] = useState(TIME_FILTER.ALL_TIME);
    const [page, setPage] = useState(0);

    function handleChange(e) {
        switch(e.target.value) {
            case TIME_FILTER.THIS_YEAR:
                setFilter(TIME_FILTER.THIS_YEAR);
                break;
            case TIME_FILTER.THIS_MONTH:
                setFilter(TIME_FILTER.THIS_MONTH);
                break;
            case TIME_FILTER.THIS_WEEK:
                setFilter(TIME_FILTER.THIS_WEEK);
                break;
            default:
                setFilter(TIME_FILTER.ALL_TIME);
        }
    }

    useEffect(() => {
        fetch(`/palettes/popular/${filter}/${ page }`)
        .then(res => res.json())
        .then(data => setPalettes(data));
    }, [filter, page]);

    return (
        <div className="Popular" style={{  maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
            <h1>Popular Palettes</h1>
            <select name="filer" onChange={ handleChange }>
                <option value={ TIME_FILTER.ALL_TIME }>All Time</option>
                <option value={ TIME_FILTER.THIS_YEAR }>This Year</option>
                <option value={ TIME_FILTER.THIS_MONTH }>This Month</option>
                <option value={ TIME_FILTER.THIS_WEEK }>This Week</option>
            </select>

            {palettes.map(palette =>
                <div className="ColorPalette">
                    <span>{ palette.color0 }</span>
                    <span>{ palette.color1 }</span>
                    <span>{ palette.color2 }</span>
                    <span>{ palette.color3 }</span>
                    <span>{ palette.color4 }</span>
                    <span>{ palette.date_created }</span>
                    <span>{ palette.num_likes }</span>
                </div>)}

        </div>
    );

}

export default Popular;
