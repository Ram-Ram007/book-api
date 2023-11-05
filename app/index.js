const express = require("express");
const morgan = require("morgan");
const {
  getAllBooks,
  addBook,
  addRating,
  getBookById,
  editBookById,
  deleteBookById,
  updateRating,
} = require("./db");
const Joi = require("joi");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/books", (req, res) => {
  const books = getAllBooks();
  res.send(books);
});
app.post("/books", (req, res) => {
  const AddbookSchema = Joi.object({
    title: Joi.string().required(),
    isbn: Joi.string().required(),
  });
  const { value, error } = AddbookSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message),
    });
  }
  const book = addBook(value);
  return res.send(book);
});

app.post("/books/:bookid/rating", (req, res) => {
  const ratingSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
  });

  const { value, error } = ratingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message),
    });
  }

  const rating = addRating({
    rating: req.body.rating,
    bookId: req.params.bookid,
  });
  return res.json(rating);
});

app.get("/books/:bookid", (req, res) => {
  const book = getBookById(req.params.bookid);
  if (!book) {
    return res.status(400).json({
      message: "book not found",
    });
  }
  return res.send(book);
});
app.put("/books/:bookid", (req, res) => {
  const etitSchema = Joi.object({
    title: Joi.string().required(),
  });
  const { value, error } = etitSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((m) => m.message),
    });
  }
  const book = editBookById({ id: req.params.bookid, title: req.body.title });
  if (!book) {
    return res.status(400).json({
      message: "book not found",
    });
  }
  return res.send(book);
});

app.delete("/books/:bookid", (req, res) => {
  const b = deleteBookById(req.params.bookid);
  if (!b) {
    return res.status(400).json({
      message: "book not found",
    });
  }
  res.send(b);
});
app.put("books/:bookid/rating", (req, res) => {
  const ratingSchema = Joi.object({
    rating: Joi.number().min(0).max(5).required(),
  });

  const { value, error } = ratingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details.map((d) => d.message),
    });
  }

  const rating = updateRating({
    rating: req.body.rating,
    bookId: req.params.bookid,
  });
  if (!rating) {
    return res.status(400).json({
      message: "rating not found",
    });
  }
  return res.json(rating);
});

app.listen(3000, () => {
  console.log("Server running on 3000");
});
