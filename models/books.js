const BookCopy = require('./bookcopy');
const Author = require('./author');

class Book {
    constructor(isbn, title, maxCheckoutLength, authors) {
        this.isbn = isbn;
        this.title = title;
        this.maxCheckoutLength = maxCheckoutLength;
        this.authors = Object.freeze(authors); // making it immutable
        this.copies = [new BookCopy(this, 1, true)];
    }

    updateCopies(copy) {
        for (let i = 0; i < this.copies.length; ++i) {
            let c = this.copies[i];
            if (c.equals(copy)) {
                this.copies[i] = copy;
            }
        }
    }

    getCopyNums() {
        return this.copies.map(c => c.getCopyNum());
    }

    addCopy() {
        const newCopy = new BookCopy(this, this.copies.length + 1, true);
        this.copies.push(newCopy);
    }

    removeCopy() {
        if (this.copies.length > 0) {
            this.copies.pop();
        }
    }

    equals(other) {
        if (other == null || other.constructor !== Book) return false;
        return this.isbn === other.isbn;
    }

    isAvailable() {
        return this.copies.some(copy => copy.isCopyAvailable());
    }

    toString() {
        return `isbn: ${this.isbn}, maxLength: ${this.maxCheckoutLength}, available: ${this.isAvailable()}`;
    }

    getNumCopies() {
        return this.copies.length;
    }

    getTitle() {
        return this.title;
    }

    getCopies() {
        return this.copies;
    }

    getAuthors() {
        return this.authors;
    }

    getIsbn() {
        return this.isbn;
    }

    getNextAvailableCopy() {
        return this.copies.find(copy => copy.isCopyAvailable()) || null;
    }

    getCopy(copyNum) {
        return this.copies.find(copy => copy.getCopyNum() === copyNum) || null;
    }

    getMaxCheckoutLength() {
        return this.maxCheckoutLength;
    }
}

module.exports = Book;
