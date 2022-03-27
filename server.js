const express = require("express");
const app = express();
const PORT = process.env.port || 5000;

// Load db environment variables
if(process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

app.get("/", (req, res) => {
    res.send("Color Palettes");
});

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`);
});
