const express = require("express");
const passport = require("passport");
const connectDB = require("./config/db");

const app = express();

app.use("/cv", express.static("cv"));
app.use("/uploads", express.static("uploads"));

// Connect db
connectDB();

// Json middleware
app.use(express.json({ extended: true }));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.use("/api/user", require("./src/api/routes/user"));
app.use("/api/profile", require("./src/api/routes/profile"));
app.use("/api/recipe", require("./src/api/routes/recipe"));
app.use("/api/picture", require("./src/api/routes/picture"));

const port = 5000;

app.listen(port, console.log(`running on ${port}`));
