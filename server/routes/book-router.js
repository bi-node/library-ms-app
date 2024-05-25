const express = require('express');
const bookController = require('../controllers/book-controller');
const authenticateUser = require('../middlewares/authenticateUser');

const router = express.Router();

// Show all books
router.get('/', authenticateUser, bookController.getAllBooks);

// Get book by ID (ISBN)
router.get('/book', authenticateUser, bookController.getBookById);

// Get book by ID with dynamic route
router.get('/:id', authenticateUser, bookController.getBookById);

// Add new book
router.post('/', authenticateUser, bookController.addNewBook);

// Add book copy
router.post('/addbookcopy', authenticateUser, bookController.addCopy);

module.exports = router;
