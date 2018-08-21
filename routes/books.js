
const express = require("express");
// const router = express.Router({mergeParams: true});
const router = express.Router();
const {getBooks, postBooks,  sendBooks, putBooks, deleteBooks, getBooksTitle} = require("../controllers/books");

router.get("/", getBooks, sendBooks);
router.post("/", postBooks, sendBooks);
router.put("/:title", putBooks, sendBooks);
router.delete("/:title", deleteBooks, sendBooks);
router.get("/:title", getBooksTitle, sendBooks);

module.exports = router;