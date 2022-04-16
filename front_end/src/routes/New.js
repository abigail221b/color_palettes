import { useEffect, useState } from "react";

function New() {

    const [palettes, setPalettes] = useState([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        fetch(`/palettes/new/${ page }`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setPalettes(data);
        });
    }, [page])

    return (
        <div className="New" style={{ maxWidth: "1000px", marginLeft: "auto", marginRight: "auto" }}>
            <h1>New Color Palettes</h1>
            { palettes.map(palette =>
                <div className="ColorPalette">
                    <span>{ palette.color0 }</span>
                    <span>{ palette.color1 }</span>
                    <span>{ palette.color2 }</span>
                    <span>{ palette.color3 }</span>
                    <span>{ palette.color4 }</span>
                    <span>{ palette.date_created }</span>
                    <span>{ palette.num_likes }</span>
                </div>)
            }
        </div>
    );
}

export default New;
