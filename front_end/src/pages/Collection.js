import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Link, useParams } from "react-router-dom";
import ColorPalette from "../components/ColorPalette/ColorPalette.js";

function Collection() {
    const [palettes, setPalettes] = useState([]);
    const likedPalettes = useSelector(state => state.likes.palettes);
    const { isLoggedIn, username } = useSelector(state => state.login);
    const { usernameParam } = useParams();

    useEffect(() => {
        setPalettes([]);
        fetch(`/palettes/user/${ usernameParam }`)
        .then(res => res.json())
        .then(palettes => setPalettes(palettes));
    }, [usernameParam]);

    const handleDelete = (color0, color1, color2, color3, color4) => {
        fetch(`/palettes/${color0}/${color1}/${color2}/${color3}/${color4}`, {
            method: "DELETE"
        });
        setPalettes(palettes.filter(palette => {
            return palette.color0!==color0 || palette.color1!==color1 || palette.color2!==color2 || palette.color3!==color3 || palette.color4!==color4
        }));
    }

    const usernameDisplay = (usernameParam===username)? "My" : usernameParam+"'s";

    return (
        <div className="Collection" style={{  maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}>
            <h1>{ usernameDisplay } Collection</h1>
            <div className="flex one two-500 three-700 four-1000">
                {palettes.map(palette => <div style={{ padding:"10px" }}>
                                            <ColorPalette
                                                creator={ palette.username }
                                                colors={[palette.color0, palette.color1, palette.color2, palette.color3, palette.color4]}
                                                date_created = { palette.date_created}
                                                num_likes = { palette.num_likes }
                                                isLikedByUser = { isLoggedIn && likedPalettes.filter(likedPalette => likedPalette.color0 === palette.color0 && likedPalette.color1 === palette.color1 && likedPalette.color2 === palette.color2 && likedPalette.color3 === palette.color3 && likedPalette.color4 === palette.color4).length > 0 }
                                                handleDelete={handleDelete}
                                                isCreatedByUser = { isLoggedIn && username && username === palette.username } />
                                         </div> )}
            </div>
        </div>
    );
}

export default Collection;
