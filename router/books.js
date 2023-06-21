"use strict";

const express = require("express");
const router = express.Router();
const Author = require("../models/authors.js");
const Book = require("../models/book.js");

//All Books Route
router.get("/", async (req, res) => {
  res.send("Books");
});

//New Book Route
router.get("/new", async (req, res) => {
  try {
    const authors = await Author.find();
    console.log(authors);
    const book = new Book();
    res.render("books/new", {
      authors: authors,
      book: book,
    });
  } catch {
    res.redirect("/books");
  }
});

//Create Book Route
router.post("/", async (req, res) => {
  res.send("hello");
});

module.exports = router;