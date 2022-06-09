import { useState } from "react";
import ColorPalette from "../components/ColorPalette.js";

function Collection() {
    const [palettes, setPalettes] = useState([]);

    return (
        <div className="Collection" style={{  maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}>
            <h1>Collection</h1>
            <div className="flex one two-500 three-700 four-1000">
                {palettes.map(palette => <div style={{ padding:"10px" }}>
                                            <ColorPalette
                                                colors={[palette.color0, palette.color1, palette.color2, palette.color3, palette.color4]}
                                                date_created = { palette.date_created}
                                                num_likes = { palette.num_likes }/>
                                         </div> )}
            </div>
        </div>
    );
}

export default Collection;
