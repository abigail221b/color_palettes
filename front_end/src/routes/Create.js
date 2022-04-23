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

    function handleSubmit(e) {
        fetch("/palette/create", {
            method: "POST",
            body: JSON.stringify({ colors: colors }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(res => console.log(res));
    }

    const create_form_style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "500px"
    };

    const color_input_style = {
        height: "300px",
        border: "none"
    };

    return (
        <div className="Create" style={ create_form_style }>
            <h1>Create a new color palette: </h1>
            <div className="colors_input flex five">
                <span><input type="color" value={ colors[0] } onChange={ (e) => handleColorChange(e, 0) } style={ color_input_style } /></span>
                <span><input type="color" value={ colors[1] } onChange={ (e) => handleColorChange(e, 1) } style={ color_input_style } /></span>
                <span><input type="color" value={ colors[2] } onChange={ (e) => handleColorChange(e, 2) } style={ color_input_style } /></span>
                <span><input type="color" value={ colors[3] } onChange={ (e) => handleColorChange(e, 3) } style={ color_input_style } /></span>
                <span><input type="color" value={ colors[4] } onChange={ (e) => handleColorChange(e, 4) } style={ color_input_style } /></span>
            </div>
            <button onClick={ handleSubmit }>Create</button>
        </div>
    );
}

export default Create;
