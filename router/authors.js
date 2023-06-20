"use strict";

const express = require("express");
const router = express.Router();
const Author = require("../models/authors");

//All Authors Route
router.get("/", (req, res) => {
  res.render("authors/index");
});

//New Author Route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

//Create Author Route
router.post("/", (req, res) => {
  const author = new Author({
    name: req.body.name
  });
  author.save().then(() => {
    res.redirect("authors");
  }).catch((err) => {
      res.render("authors/new", {
        author: author,
        errorMessage: "Error creating Author",
      })
  });
  //res.send(req.body.name);
});

module.exports = router;