const express = require("express");
const app = express();
const config = require("./config/development");
const bodyParser = require('body-parser');
const users = require("./routes/users");
const books = require("./routes/books");
const technologies = require("./routes/technologies");


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use((req, res, next) => {
    console.log(`${req.url} --> ${req.method} --> ${Date.now()}`);
    next();
});



app.use('/users', users);
app.use('/books', books);
app.use('/technologies/', technologies);


// Not Found Error
app.use((req, res, next) => {
    const error = new Error("Not Found!");
    next(error);
});

// All errors
app.use((err, req, res, next) => {
    res.status(500);
    res.json({
        error: err.message,
        stack: err.stack
    })
});

app.listen(config.port);
