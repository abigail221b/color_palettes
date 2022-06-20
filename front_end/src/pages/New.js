import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ColorPalette from "../components/ColorPalette.js";

function New() {

    const [palettes, setPalettes] = useState([]);
    const [page, setPage] = useState(1);
    const likedPalettes = useSelector(state => state.likes.palettes);

    useEffect(() => {
        fetch(`/palettes/new/?limit=15&page=${ page }`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setPalettes(data);
        });
    }, [page])

    return (
        <div className="New" style={{ maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}>
            <h1>New Color Palettes</h1>
            <div className="flex one two-500 three-700 four-1000">
                {palettes.map(palette => <div style={{ padding:"10px" }}>
                                            <ColorPalette
                                                key={ palette.color0 + palette.color1 + palette.color2 + palette.color3 + palette.color4 }
                                                creator={ palette.username }
                                                colors={[palette.color0, palette.color1, palette.color2, palette.color3, palette.color4]}
                                                date_created = { palette.date_created}
                                                num_likes = { palette.num_likes }
                                                isLikedByUser = { likedPalettes.filter(likedPalette => likedPalette.color0 === palette.color0 && likedPalette.color1 === palette.color1 && likedPalette.color2 === palette.color2 && likedPalette.color3 === palette.color3 && likedPalette.color4 === palette.color4).length > 0 } />
                                         </div> )}
            </div>
        </div>
    );
}

export default New;
