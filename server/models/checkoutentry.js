
class CheckOutEntry{
    constructor(isbn, memberid, issued_bookno, checkoutdate, duedate){
        this.isbn=isbn;
        this.memberid=memberid;
        this.issued_bookno=issued_bookno;
        this.checkoutdate=checkoutdate;
        this.duedate=duedate;
    }
}

module.exports=CheckOutEntry;