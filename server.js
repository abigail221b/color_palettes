const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const palettesRouter = require("./routes/Palettes.js");
const userRouter = require("./routes/User.js");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/palettes", palettesRouter);
app.use("/user",     userRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${ PORT }`);
});
