const Book = require('./books');

class BookCopy {
    constructor(book, copyNum, isAvailable) {
        this.book = book;
        this.copyNum = copyNum;
        this.isAvailable = isAvailable;

    }

    isAvailable() {
        return this.isAvailable;
    }

    getCopyNum() {
        return this.copyNum;
    }

    getBook() {
        return this.book;
    }

    changeAvailability() {
        this.isAvailable = !this.isAvailable;
    }

    equals(other) {
        if (other == null) return false;
        if (!(other instanceof BookCopy)) return false;
        return other.book.getIsbn() === this.book.getIsbn() && other.copyNum === this.copyNum;
    }

}


module.exports = BookCopy;