import { useEffect, useState } from "react";
import ColorPalette from "../components/ColorPalette.js";

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
            <div className="flex one two-500 three-800">
                {palettes.map(palette => <div><ColorPalette
                                            colors={[palette.color0, palette.color1, palette.color2, palette.color3, palette.color4]}
                                            date_created = { palette.date_created}
                                            num_likes = { palette.num_likes }/></div> )}
            </div>
        </div>
    );
}

export default New;
