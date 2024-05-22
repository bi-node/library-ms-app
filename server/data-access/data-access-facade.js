const pool = require('../db');

module.exports = class DataAccessFacade {
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
    
    
    static async addNewBook(book) {
        const client = await pool.connect();
        try {
            const queryText = 'INSERT INTO public.books(isbn, title, max_checkout_length, authors) VALUES($1, $2, $3, $4) RETURNING *';
            const values = [book.isbn, book.title, book.max_checkout_length, book.authors];
            const resultset = await client.query(queryText, values);
            return resultset.rows[0]; // Return the inserted row
        } catch (error) {
            console.error("Error adding new member:", error);
            throw error; // Re-throw the error to be caught by the calling function
        } finally {
            client.release();
        }
    }

    updateBook(book) {
        // Implementation here
    }

    updateLibraryMember(member) {
        // Implementation here
    }
};
