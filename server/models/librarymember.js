
const Person = require('./person');
const CheckOutEntry = require('./checkoutentry');

class LibraryMember extends Person {
    constructor(memberid, firstname, lastname, telephone, address) {
        super(firstname, lastname, telephone, address);
        this.memberid = memberid;
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



