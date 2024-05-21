const Person=('./person');

class Author extends Person{
    constructor(fname, lname, mob, address,bio, credit){
        super(fname,lname,mob,address);
        this.bio=bio;
        this.credit=credit;
    }
}