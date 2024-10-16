"use strict";

if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const indexRouter = require("./router/index.js");
const authorRouter = require("./router/authors.js");
const bookRouter = require("./router/books.js");

const app = express();

app.set("view engine", "ejs");
app.set("layout", "layout/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false}));
app.use(methodOverride("_method"));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to mongoose"));

app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on PORT: ' + process.env.PORT);
});