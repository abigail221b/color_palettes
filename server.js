const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const palettesRouter = require("./routes/Palettes.js");
const userRouter = require("./routes/User.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/palettes", palettesRouter);
app.use("/user",     userRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`);
});
