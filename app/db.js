const { v4: uuidv4 } = require("uuid");
const isbnValidator = require("./Validation/ISBN_validation");

const books = [
  {
    id: "213",
    title: "",
    isbn: "",
  },
  {
    id: "215",
    title: "",
    isbn: "",
  },
  {
    id: "216",
    title: "",
    isbn: "",
  },
];

const ratings = [];

const getAllBooks = () => books;

const addBook = ({ title, isbn }) => {
  const bookId = uuidv4();
  if (
    !isbnValidator.ValidateISBN10(isbn) &&
    !isbnValidator.ValidateISBN13(isbn)
  ) {
    return { error: "Invalid ISBN" };
  }

  const newBook = {
    id: bookId,
    title,
    isbn,
  };
  books.push(newBook);
  return newBook;
};

const addRating = ({ rating, bookId }) => {
  const newRating = {
    id: uuidv4(),
    rating,
    bookId,
  };
  ratings.push(newRating);
  return newRating;
};

const getBook = (bookId) => {
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return { error: "Book not found" };
  }

  const bookRating = ratings.find((r) => r.bookId === bookId);

  if (!bookRating) {
    // Return 0 if no rating is set for the book
    book.rating = 0;
  } else {
    book.rating = bookRating.rating;
  }

  return book;
};

const updateBookTitle = (bookId, title) => {
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return { error: "Book not found" };
  }

  book.title = title;
  return book;
};

const deleteBook = (bookId) => {
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return { error: "Book not found" };
  }

  books.splice(bookIndex, 1);
  return {};
};

const updateBookRating = (bookId, rating) => {
  const book = books.find((b) => b.id === bookId);

  if (!book) {
    return { error: "Book not found" };
  }

  const bookRating = ratings.find((r) => r.bookId === bookId);

  if (!bookRating) {
    return { error: "Rating not found for the book" };
  }

  bookRating.rating = rating;
  return bookRating;
};

const deleteRating = (ratingId) => {
  const ratingIndex = ratings.findIndex((r) => r.id === ratingId);

  if (ratingIndex === -1) {
    return { error: "Rating not found" };
  }

  ratings.splice(ratingIndex, 1);
  return {};
};

module.exports = {
  getAllBooks,
  addBook,
  addRating,
  getBook,
  updateBookTitle,
  deleteBook,
  updateBookRating,
  deleteRating,
};
