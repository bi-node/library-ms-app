const Book=require('./books');

class CheckOutEntry{
    constructor(book, checkOutDate, dueDate){
        this.book=book;
        this.checkOutDate=checkOutDate;
        this.dueDate=dueDate;
    }

    getBook(){
        return this.book;
    }

    getCheckOutDate(){
        return this.checkOutDate;
    }

    getDueDate(){
        return this.dueDate;
    }

    
}

module.exports=CheckOutEntry;