const express = require("express");
const app = express();
const config = require("./config/development");
const bodyParser = require('body-parser');
const slug = require('slug');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



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
  USERS.splice(index, 1);
  req.users = USERS;
  next();
};

const putUsers = (req, res, next) => {
    const user = req.body;
    const index = req.params.index;
    Object.assign(USERS[index], user);
    req.users = USERS;
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



const postBooks = (req, res, next) => {
    const book = req.body;
    book.url = slug(book.title);
    const index = req.params.index;
    USERS[index].books.push(book);
    req.books = USERS[index].books;
    next();
};

const putBooks = (req, res, next) => {
    const book = req.body;
    const index = req.params.index;
    const title = req.params.title;

    book.url = slug(book.title);
    Object.assign(USERS[index].books.find(el => el.url === title), book);
    req.books = USERS[index].books;
    next();
};

const deleteBooks = (req, res, next) => {

    const index = req.params.index;
    const title = req.params.title;
    const indexBook = USERS[index].books.findIndex(el => el.url === title);
    USERS[index].books.splice(indexBook, 1);
    req.books = USERS[index].books;
    next();
};

const getBooksTitle = (req, res, next) => {
    const index = req.params.index;
    const title = req.params.title;
    req.books = USERS[index].books.find(el => el.url === title);
    next();
};




// Users
app.get("/users/", getUsers, sendUsers);
app.post("/users/", addUser, sendUsers);
app.delete("/users/:index", deleteUsers, sendUsers);
app.put("/users/:index", putUsers, sendUsers);

// Books
app.get("/users/:index/books", getBooks, sendBooks);
app.post("/users/:index/books", postBooks, sendBooks);
app.put("/users/:index/books/:title", putBooks, sendBooks);
app.delete("/users/:index/books/:title", deleteBooks, sendBooks);
app.get("/users/:index/books/:title", getBooksTitle, sendBooks);


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