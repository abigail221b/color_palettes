
function ColorPalette({ colors, date_created, num_likes}) {

    const colorPalette_style = {
        height: "225px",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        padding: "10px"
    };

    const colorView_style = {
        width: "100%",
        height: "100%",
        display: "flex"
    };

    const colorBlock_style = {
        width: "100%",
        height: "100%"
    };

    const paletteInfo_style = {
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    };

    const likesButton_style = {
        backgroundColor: "pink"
    };

    return (
        <div className="ColorPalette" style={ colorPalette_style }>
            <div className="colorView" style={ colorView_style }>
                { colors.map(color => <div style={{ ...colorBlock_style, backgroundColor:`#${color}` }}></div>) }
            </div>
            <div className="info" style={ paletteInfo_style }>
                <div>{ date_created }</div>
                <button style={ likesButton_style }>&#9829; { num_likes }</button>
            </div>
        </div>
    );
}

export default ColorPalette;
