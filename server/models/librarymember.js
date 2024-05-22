
const Person = require('./person');
const CheckOutEntry = require('./checkoutentry');

class LibraryMember extends Person {
    constructor(memberId, firstName, lastName, telephone, address) {
        super(firstName, lastName, telephone, address);
        this.memberId = memberId;
        this.checkoutRecord = [];
    }

    addCheckOutRecord(coe) {
        this.checkoutRecord.push(coe);
    }

    getMemberId() {
        return this.memberId;
    }

    static addMember(){
        
    }

    getCheckOutEntries() {
        return this.checkoutRecord;
    }

   
}

module.exports = LibraryMember;



