const express = require("express");
const app = express();
const config = require("./config/development");
const bodyParser = require('body-parser');
const slug = require('slug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
    console.log(`${req.url} --> ${req.method} --> ${Date.now()}`);
    next();
});

// endpoint = url + method

const USERS = require("./mock-data/users");


const getUsers = (req, res, next) => {
    req.users = USERS;
    next();
};


const sendUsers = (req, res, next) => {
    res.status(200);
    res.json(req.users);
};

const addUser = (req, res, next) => {
    const user = req.body;
    USERS.push(user);
    req.users = USERS;
    next();
};

const deleteUsers = (req, res, next) => {
  const index = req.params.index;
  delete USERS[index];
  req.users = USERS;
  next();
};

const putUsers = (req, res, next) => {
    const user = req.body;
    const index = req.params.index;
    const update = Object.assign(USERS[index], user);
    const final = Object.assign(USERS, update);
    req.users = final;
    next();
};

const getBooks = (req, res, next) => {
    const index = req.params.index;
    req.books = USERS[index].books;
    next();
};

const sendBooks = (req, res, next) => {
    res.status(200);
    res.json(req.books);
};

const deleteBooks = (req, res, next) => {
    const index = req.params.index;
    const newTitle = slug(USERS[index].books.title);

    req.books = USERS[index].books;
    next();
};

const postBooks = (req, res, next) => {
    const book = req.body;
    const index = req.params.index;
    USERS[index].books.push(book);
    req.books = USERS[index].books;
    next();
};


// const putBooks = (req, res, next) => {
//     const book = req.body;
//     const index = req.params.index;
//     const update = Object.assign(USERS[index].books, book);
//     const final = Object.assign(USERS, update);
//
//     req.books = final;
//     next();
// }


// Users
app.get("/users/", getUsers, sendUsers);
app.post("/users/", addUser, sendUsers);
app.delete("/users/:index/", deleteUsers, sendUsers);
app.put("/users/:index/", putUsers, sendUsers);

// Books
app.get("/users/:index/books", getBooks, sendBooks);
app.post("/users/:index/books", postBooks, sendBooks)


//not done
app.put("/users/:index/books/:title");
app.delete("/users/:index/books/:title", deleteBooks, sendBooks);
app.get("/users/:index/books/:title");



// Not Found Error
app.use((req, res, next) => {
    const error = new Error("Not Found!");
    next(error);
})

// All errors
app.use((err, req, res, next) => {
    res.status(500);
    res.json({
        error: err.message,
        stack: err.stack
    })
});

app.listen(config.port);