
const BookCopy=require('../models/bookcopy');

class Book {
    constructor(isbn, title, max_checkout_length, authors) {
        this.isbn = isbn
        this.title = title;
        this.max_checkout_length=max_checkout_length;
        this.authors = authors;
    }

    // addCopy() {
    //     const copyNumber = this.copies.length + 1;
    //     const newCopy = new BookCopy(copyNumber, this);
    //     this.copies.push(newCopy);
    //     return newCopy;
    // }

    // getCopy(copyNumber) {
    //     return this.copies.find(copy => copy.copyNumber === copyNumber);
    // }
}

module.exports=Book;