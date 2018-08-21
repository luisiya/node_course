const USERS = require("../mock-data/users");

const slug = require("slug");


module.exports.getBooks = (req, res, next) => {
    const index = req.params.index;
    req.books = USERS[index].books;
    next();
};

module.exports.sendBooks = (req, res, next) => {
    res.status(200);
    res.json(req.books);
};


module.exports.postBooks = (req, res, next) => {
    const book = req.body;
    book.url = slug(book.title);
    const index = req.params.index;
    USERS[index].books.push(book);
    req.books = USERS[index].books;
    next();
};

module.exports.putBooks = (req, res, next) => {
    const book = req.body;
    const index = req.params.index;
    const title = req.params.title;

    book.url = slug(book.title);
    Object.assign(USERS[index].books.find(el => el.url === title), book);
    req.books = USERS[index].books;
    next();
};

module.exports.deleteBooks = (req, res, next) => {

    const index = req.params.index;
    const title = req.params.title;
    const indexBook = USERS[index].books.findIndex(el => el.url === title);
    USERS[index].books.splice(indexBook, 1);
    req.books = USERS[index].books;
    next();
};

module.exports.getBooksTitle = (req, res, next) => {
    const index = req.params.index;
    const title = req.params.title;
    req.books = USERS[index].books.find(el => el.url === title);
    next();
};

