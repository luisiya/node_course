const USERS = require("../mock-data/users");
const slug = require("slug");

module.exports.getUsers = (req, res, next) => {
    req.users = USERS;
    next();
};


module.exports.sendUsers = (req, res, next) => {
    res.status(200);
    res.json(req.users);
};

module.exports.addUser = (req, res, next) => {
    const user = req.body;
    USERS.push(user);
    req.users = USERS;
    next();
};

module.exports.deleteUsers = (req, res, next) => {
    const index = req.params.index;
    USERS.splice(index, 1);
    req.users = USERS;
    next();
};

module.exports.putUsers = (req, res, next) => {
    const user = req.body;
    const index = req.params.index;
    Object.assign(USERS[index], user);
    req.users = USERS;
    next();
};
