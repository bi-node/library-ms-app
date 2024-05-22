const Person = require('./person'); // Correct way to import in Node.js

class Author extends Person {
    constructor(firstname, lastname, telephone, address, bio, credit) {
        super(firstname, lastname, telephone, address); // Call the parent class constructor
        this.bio = bio;
        this.credit = credit;
    }
}

module.exports=Author;
