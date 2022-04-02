import { useState } from "react";

function Create() {
    const [colors, setColors] = useState(["#000000", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#000000"]);

    function handleColorChange(e, id) {
        let newColors = colors.map( (color, index) => {
            if(id === index) return e.target.value;
            return color;
        });
        setColors(newColors);
    }

    return (
        <div className="Create">
            <h1>Create a new color palette: </h1>
            <div className="colors_input flex five">
                <input type="color" value={ colors[0] } onChange={ (e) => handleColorChange(e, 0) }/>
                <input type="color" value={ colors[1] } onChange={ (e) => handleColorChange(e, 1) }/>
                <input type="color" value={ colors[2] } onChange={ (e) => handleColorChange(e, 2) }/>
                <input type="color" value={ colors[3] } onChange={ (e) => handleColorChange(e, 3) }/>
                <input type="color" value={ colors[4] } onChange={ (e) => handleColorChange(e, 4) }/>
            </div>
            <button onClick={ handleSubmit }>Create</button>
        </div>
    );
}

export default Create;
