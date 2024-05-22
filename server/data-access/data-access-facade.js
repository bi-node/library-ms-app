const pool = require('../db');


// public HashMap<String,Book> readBooksMap();
// 	public HashMap<String,User> readUserMap();
// 	public HashMap<String, LibraryMember> readMemberMap();
// 	public void saveNewMember(LibraryMember member); 
// 	public void saveNewBook(Book book);
// 	public void updateBook(Book book);
// 	public  void updateLibraryMember(LibraryMember member);


module.exports = class DataAccessFacade {
    static readAllBook() {

    }

    static async readAllUser() {
        const client = await pool.connect();
        try {
            const resultset = await client.query('SELECT * FROM users ');
            const allUsers = resultset.rows;
            return allUsers;
            //return result.rows[0];
        } finally {
            client.release();
        }

    }



    static readAllMember() {

    }

    saveNewMember(member) {

    }
    saveNewBook(book) {

    }

    updateBook(book) {

    }

    updateLibraryMember(member) {

    }

};