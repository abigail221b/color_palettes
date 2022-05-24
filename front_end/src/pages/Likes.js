import { useEffect, useState } from "react";
import ColorPalette from "../components/ColorPalette.js";

function Liked() {
    const [palettes, setPalettes] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch("/user/likes?username=demo_user")
        .then(res => res.json())
        .then(palettes => setPalettes(palettes));
    }, []);

    return (
        <div className="Liked" style={{  maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}>
            <h1>Liked Color Palettes</h1>
            <div className="flex one two-500 three-700 four-1000">
                {palettes.map(palette => <div style={{ padding:"10px" }}>
                                            <ColorPalette
                                                colors={[palette.color0, palette.color1, palette.color2, palette.color3, palette.color4]}
                                                date_created = { palette.date_created}
                                                num_likes = { null }/>
                                         </div> )}
            </div>
        </div>
    );
}

export default Liked;
