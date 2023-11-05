const { v4: uuidv4 } = require("uuid");
const { isValidISBN } = require("./Validation/ISBN_validation");

const books = [
  {
    id: 1234,
    title: "wings of fire",
    isbn: "007462542X",
  },
];

const booksRatings = [
  {
    id: 200,
    rating: 3,
    bookId: 1234,
  },
];

const getAllBooks = () => books;
const addBook = ({ title, isbn }) => {
  if (isValidISBN(isbn)) {
    const id = uuidv4();
    const b = {
      id,
      title,
      isbn,
    };
    books.push(b);
    return b;
  } else console.log("Invalid");
};

const addRating = ({ rating, bookId }) => {
  const ratingId = uuidv4();

  const bookRating = {
    ratingId,
    rating,
    bookId,
  };
  booksRatings.push(bookRating);
  return bookRating;
};
const getBookById = (id) => {
  const book = books.find((b) => b.id == id);

  if (!book) {
    return null;
  }

  const ratingEntry = booksRatings.find((b) => b.bookId == id);

  const rating = ratingEntry ? ratingEntry.rating : 0;

  b = {
    id: book.id,
    title: book.title,
    isbn: book.isbn,
    rating: rating,
  };
  return b;
};
const editBookById = ({ id, title }) => {
  const idx = books.findIndex((b) => b.id == id);
  if (idx != -1) {
    books[idx]["title"] = title;
    return books[idx];
  }
  return null;
};
const deleteBookById = (id) => {
  const idx = books.findIndex((b) => b.id == id);
  const ratingidx = booksRatings.findIndex((b) => b.bookId == id);
  if (idx == -1) {
    return null;
  }
  const b = books[idx];
  books.splice(idx, 1);
  if (ratingidx !== -1) {
    const r = books[ratingidx];
    booksRatings.splice(ratingidx, 1);
  }
  return b;
};

const updateRating = ({ rating, bookId }) => {
  const idx = booksRatings.findIndex((b) => b.bookId == bookId);
  if (idx != -1) {
    booksRatings[idx]["rating"] = rating;
    return booksRatings[idx];
  }
  return null;
};

module.exports = {
  getAllBooks,
  addBook,
  addRating,
  getBookById,
  editBookById,
  deleteBookById,
  updateRating,
};
