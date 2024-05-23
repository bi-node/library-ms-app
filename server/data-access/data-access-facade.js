const pool = require('../db');

module.exports = class DataAccessFacade {
    static async readAllUser() {
        const client = await pool.connect();
        try {
            const resultset = await client.query('SELECT id, username, role FROM public.users');
            return resultset.rows;
        } catch (error) {
            console.error("Error reading all Users:", error);
            throw error; // Re-throw the error to be caught by the calling function
        } finally {
            client.release();
        }
    }


    static async readAllMember() {
        const client = await pool.connect();
        try {
            const resultset = await client.query('SELECT * FROM public.members');
            return resultset.rows;
        } catch (error) {
            console.error("Error reading all members:", error);
            throw error; // Re-throw the error to be caught by the calling function
        } finally {
            client.release();
        }
    }

    static async getmemberbyId(memberid) {
        const client = await pool.connect();
        try {
            const checkQueryText = 'SELECT * FROM public.members WHERE memberid = $1';
            const resultset = await client.query(checkQueryText, [memberid]);
            return resultset.rows[0];
        } catch (error) {
            console.error("Error reading all members:", error);
            throw error; // Re-throw the error to be caught by the calling function
        } finally {
            client.release();
        }
    }


    static async readAllUser() {
        const client = await pool.connect();
        try {
            const resultset = await client.query('SELECT * FROM users');
            return resultset.rows;
        } catch (error) {
            console.error("Error reading all users:", error);
            throw error; // Re-throw the error to be caught by the calling function
        } finally {
            client.release();
        }
    }

    static async addNewMember(member) {
        const client = await pool.connect();
        try {
            const queryText = 'INSERT INTO public.members(firstname, lastname, telephone, address) VALUES($1, $2, $3, $4) RETURNING *';
            const values = [member.firstname, member.lastname, member.telephone, member.address];
            const resultset = await client.query(queryText, values);
            return resultset.rows[0]; // Return the inserted row
        } catch (error) {
            console.error("Error adding new member:", error);
            throw error; // Re-throw the error to be caught by the calling function
        } finally {
            client.release();
        }
    }

    static async readAllBooks(){
        const client = await pool.connect();
        try {
            const resultset = await client.query('SELECT * FROM public.books');
            return resultset.rows;
        } catch (error) {
            console.error("Error reading all members:", error);
            throw error; // Re-throw the error to be caught by the calling function
        } finally {
            client.release();
        }
    }

    static async getBookbyId(isbn){
        const client = await pool.connect();
        try {
            const checkQueryText = 'SELECT * FROM public.books WHERE isbn = $1';
            const resultset = await client.query(checkQueryText, [isbn]);
            return resultset.rows;
        } catch (error) {
            console.error("Error reading all members:", error);
            throw error; // Re-throw the error to be caught by the calling function
        } finally {
            client.release();
        }
    }
    
    static async addNewBook(book) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN'); // Start transaction
    
            // Check if the ISBN already exists
            const checkQueryText = 'SELECT * FROM public.books WHERE isbn = $1';
            const checkResult = await client.query(checkQueryText, [book.isbn]);
    
            if (checkResult.rows.length > 0) {
                throw new Error('Book with this ISBN already exists');
            }
    
            // Insert into books table
            const bookQueryText = 'INSERT INTO public.books(isbn, title, max_checkout_length, authors) VALUES($1, $2, $3, $4) RETURNING *';
            const bookValues = [book.isbn, book.title, book.max_checkout_length, book.authors];
            const bookResult = await client.query(bookQueryText, bookValues);
            const insertedBook = bookResult.rows[0];
    
            // Insert into book_copies table
            const copyQueryText = 'INSERT INTO public.book_copies(isbn, status) VALUES($1, $2) RETURNING *';
            const copyValues = [insertedBook.isbn, 'available']; // Assuming the status is 'available' for a new book
            const copyResult = await client.query(copyQueryText, copyValues);
    
            await client.query('COMMIT'); // Commit transaction
    
            return insertedBook; // Return both inserted rows
        } catch (error) {
            await client.query('ROLLBACK'); // Rollback transaction on error
            console.error("Error adding new book and book copy:", error);
            throw error; // Re-throw the error to be caught by the calling function
        } finally {
            client.release();
        }
    }
    

    static async updateBookCopy(isbn, noCopies) {
        const client = await pool.connect();
        try {
            for(let i=0;i<noCopies; i++){
            const copyQueryText = 'INSERT INTO public.book_copies(isbn, status) VALUES($1, $2) RETURNING *';
            const copyValues = [isbn, 'available']; // Assuming the status is 'available' for a new book
            await client.query(copyQueryText, copyValues);
            }

        } catch (error) {
            console.error("Error adding new member:", error);
            throw error; // Re-throw the error to be caught by the calling function
        } finally {
            client.release();
        }
    }


    updateLibraryMember(member) {
        // Implementation here
    }
};
