"use strict";

const express = require("express");
const router = express.Router();
const Author = require("../models/authors.js");
const Book = require("../models/book.js");
const imageMimeTypes = ["image/jpeg", "image/png", "image/gif"];

//All Books Route
router.get("/", async (req, res) => {
  let query = Book.find();
  if(req.query.title != null && req.query.title != ""){
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }
  if(req.query.publishedBefore != null && req.query.publishedBefore != ""){
    query = query.lte("publishDate", req.query.publishedBefore);
  }
  if(req.query.publishedAfter != null && req.query.publishedAfter != ""){
    query = query.lte("publishDate", req.query.publishedAfter);
  }
  try {
    const books = await query.exec();
    res.render("books/index", {
      books: books,
      searchOptions: req.query,
    });
  } catch(err) {
    console.error(err);
    res.redirect("/")
  }
});

//New Book Route
router.get("/new", async (req, res) => {
  renderNewPage(res, new Book());
});

//Create Book Route
router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
  });
  saveCover(book, req.body.cover)

  try {
    const newBook = await book.save();
    res.redirect("books");
  } catch(error) {
    console.log(error);
    renderNewPage(res, book, true);
  };
});

router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
                           .populate('author')
                           .exec();
    console.log(book.author);                    
    res.render('books/show', { book: book })
  } catch {
    res.redirect('/')
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    renderEditPage(res, book);
  } catch {

  }
});

async function renderNewPage(res, book, hasError = false){
  renderFormPage(res, book, "new", hasError);
}

async function renderEditwPage(res, book, hasError = false){
  renderFormPage(res, book, "edit", hasError);
}

async function renderFormPage(res, book, form, hasError = false){
  try {
    const authors = await Author.find();
    const params = {
      authors: authors,
      book: book,
    }
    if(hasError){
      params.errorMessage = "Error Creating Book";
    }
    res.render(`books/${form}`, params);
  } catch {
    res.redirect("/books");
  }
}

function saveCover(book, coverEncode){
  if(coverEncode == null) return;
  const cover = JSON.parse(coverEncode);
  if(cover != null && imageMimeTypes.includes(cover.type)){
    book.coverImage = new Buffer.from(cover.data, "base64");
    book.coverImageType = cover.type;
  }
}

module.exports = router;