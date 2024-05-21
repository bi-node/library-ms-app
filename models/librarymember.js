const Person = require('./person'); // Correct way to import in Node.js
const CheckOutEntry=require('./checkoutentry');

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

    getCheckOutEntries() {
        return this.checkoutRecord;
    }

    toString() {
        let string = `Member Info: ID: ${this.memberId}, name: ${this.getFirstName()} ${this.getLastName()}, ${this.getTelephone()} ${this.getAddress()}`;
        let sb = string;
        for (let cc of this.getCheckOutEntries()) {
            sb += `, Book: ${cc.getBook()}, CheckOutDate: ${cc.getCheckOutDate()}, DueDate: ${cc.getDueDate()}`;
        }
        return sb;
    }
}

module.exports = LibraryMember;



