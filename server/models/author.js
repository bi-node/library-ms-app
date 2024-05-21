const Person = require('./person'); // Correct way to import in Node.js

class Author extends Person {
    constructor(fname, lname, mob, address, bio, credit) {
        super(fname, lname, mob, address); // Call the parent class constructor
        this.bio = bio;
        this.credit = credit;
    }
}

module.exports=Author;
