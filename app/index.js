const express = require("express");
const bodyParser = require("body-parser");
const {
  getAllBooks,
  addBook,
  addRating,
  getBook,
  updateBookTitle, // This function is required
  deleteBook,
  updateBookRating, // This function is required
  deleteRating,
} = require("./db");

const app = express();

app.use(bodyParser.json());

// 1. GET /books
app.get("/books", (req, res) => {
  res.json(getAllBooks());
});

// 2. POST /books
app.post("/books", (req, res) => {
  const { title, isbn } = req.body;
  const result = addBook({ title, isbn });

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  res.status(201).json(result);
});

// 3. POST /books/:bookid/rating
app.post("/books/:bookid/rating", (req, res) => {
  const { rating } = req.body;
  const bookId = req.params.bookid;
  const result = addRating({ rating, bookId });

  res.status(201).json(result);
});

// 4. GET /books/:bookid
app.get("/books/:bookid", (req, res) => {
  const bookId = req.params.bookid;
  const result = getBook(bookId);

  if (result.error) {
    return res.status(404).json({ message: result.error });
  }

  res.json(result);
});

// 5. PUT /books/:bookid
app.put("/books/:bookid", (req, res) => {
  const bookId = req.params.bookid;
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Book should have a title" });
  }

  const result = updateBookTitle(bookId, title);

  if (result.error) {
    return res.status(404).json({ message: result.error });
  }

  res.json(result);
});

// 6. DELETE /books/:bookid
app.delete("/books/:bookid", (req, res) => {
  const bookId = req.params.bookid;
  const result = deleteBook(bookId);

  if (result.error) {
    return res.status(404).json({ message: result.error });
  }

  res.json({ message: "Book deleted" });
});

// 7. PUT /books/:bookid/rating
app.put("/books/:bookid/rating", (req, res) => {
  const bookId = req.params.bookid;
  const { rating } = req.body;

  if (rating < 0 || rating > 5) {
    return res
      .status(400)
      .json({ message: "Rating should be between 0 and 5" });
  }

  const result = updateBookRating(bookId, rating);

  if (result.error) {
    return res.status(404).json({ message: result.error });
  }

  res.json(result);
});

// 8. GET /rating/:ratingid
app.get("/rating/:ratingid", (req, res) => {
  const ratingId = req.params.ratingid;
  const rating = ratings.find((r) => r.id === ratingId);

  if (!rating) {
    return res.status(404).json({ message: "Rating not found" });
  }

  const book = books.find((b) => b.id === rating.bookId);
  rating.book = book;

  res.json(rating);
});

// 9. DELETE /rating/:ratingid
app.delete("/rating/:ratingid", (req, res) => {
  const ratingId = req.params.ratingid;
  const result = deleteRating(ratingId);

  if (result.error) {
    return res.status(404).json({ message: result.error });
  }

  res.json({ message: "Rating deleted" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
