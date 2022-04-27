import { useEffect, useState } from "react";

function Liked() {
    const [palettes, setPalettes] = useState(() => {
        let saved = localStorage.getItem("palettes");
        if(saved) {
            return JSON.parse(saved);
        }
        return [];
    });
    const [page, setPage] = useState(0);

    return (
        <div className="Liked" style={{  maxWidth: "1200px", marginLeft: "auto", marginRight: "auto" }}>
            <h1>Liked Color Palettes</h1>
        </div>
    );
}

export default Liked;
