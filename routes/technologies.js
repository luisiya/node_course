


const express = require("express");
const router = express.Router();
const {checkTechnologies} = require("../controllers/technologies");


router.get("/", checkTechnologies);

module.exports = router;