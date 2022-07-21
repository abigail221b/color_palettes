import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

function Create() {
    const [colors, setColors] = useState(["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]);
    const { username } = useSelector(state => state.login);
    const { isLoggedIn } = useSelector(state => state.login);
    const [submitStatus, setSubmitStatus] = useState({
        submitted: false,
        success: false,
        msg: ""
    });

    function handleColorChange(e, id) {
        if(submitStatus.submitted)
            setSubmitStatus({...submitStatus, submitted: false, msg: ""});

        let newColors = colors.map( (color, index) => {
            if(id === index) return e.target.value;
            return color;
        });

        setColors(newColors);
    }

    function handleSubmit(e) {
        if(submitStatus.submitted) {
            setSubmitStatus({
                ...submitStatus,
                success: false,
                msg: "You have already submitted this palette."});
        } else {
            fetch("/palettes", {
                method: "POST",
                body: JSON.stringify({ username: username, colors: colors }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                setSubmitStatus({
                    submitted: true,
                    success: true,
                    msg: "Successfully created!"});
            });
        }
    }

    const create_form_style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "500px"
    };

    const colorsInput_style = {
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(5, auto)"
    };

    const colorInput_style = {
        height: "300px",
        width: "100%",
        border: "1px solid black"
    };

    const createButton_style = {
        width: "100%",
        height: "55px",
        backgroundColor: "yellow",
        marginTop: "15px"
    };

    const msg_style = {
        width: "100%",
        color: "white",
        textAlign: "center",
        borderRadius: "2px",
        marginTop: "5px"
    };

    if(!isLoggedIn) {
        return <Navigate to="../login" />;
    }

    return (
        <div className="Create" style={ create_form_style }>
            <h1>Create a new color palette </h1>
            <div style={colorsInput_style}>
                <label style={{...colorInput_style, ...{ backgroundColor: colors[0]} }}><input type="color" onChange={ (e) => handleColorChange(e, 0) } style={{ display: "none" }} /></label>
                <label style={{...colorInput_style, ...{ backgroundColor: colors[1]} }}><input type="color" onChange={ (e) => handleColorChange(e, 1) } style={{ display: "none" }} /></label>
                <label style={{...colorInput_style, ...{ backgroundColor: colors[2]} }}><input type="color" onChange={ (e) => handleColorChange(e, 2) } style={{ display: "none" }} /></label>
                <label style={{...colorInput_style, ...{ backgroundColor: colors[3]} }}><input type="color" onChange={ (e) => handleColorChange(e, 3) } style={{ display: "none" }} /></label>
                <label style={{...colorInput_style, ...{ backgroundColor: colors[4]} }}><input type="color" onChange={ (e) => handleColorChange(e, 4) } style={{ display: "none" }} /></label>
            </div>
            <button style={ createButton_style } onClick={ handleSubmit }>Create</button>
            <div style={{...msg_style, backgroundColor: submitStatus.submitted && submitStatus.success? "#2ecc40" : "#ff4136"}}>{ submitStatus.msg }</div>
        </div>
    );
}

export default Create;
