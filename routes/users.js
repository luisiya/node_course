
const express = require("express");
const router = express.Router();
const {getUsers, sendUsers, deleteUsers, addUser, putUsers} = require("../controllers/users");
const booksRoute = require("./books");

router.get("/", getUsers, sendUsers);
router.post("/", addUser, sendUsers);
router.delete("/:index", deleteUsers, sendUsers);
router.put("/:index", putUsers, sendUsers);


module.exports = router;