const express = require("express");
const connectDB = require("./config/db");
const passport = require('passport');
const app = express();

connectDB();

// Json middleware
app.use(express.json({extended:false}));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

app.use('/api/user', require('./routes/api/user'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/recipe', require('./routes/api/recipe'));
app.use('/api/photos', require('./routes/api/photos'));



const port = 5000;

app.listen(port, console.log(`running on ${port}`));
