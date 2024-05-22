const pool = require('../db');

module.exports = class DataAccessFacade {
    static async readAllMember() {
        const client = await pool.connect();
        try {
            const resultset = await client.query('SELECT * FROM public."libraryMembers"');
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

    saveNewMember(member) {
        // Implementation here
    }

    saveNewBook(book) {
        // Implementation here
    }

    updateBook(book) {
        // Implementation here
    }

    updateLibraryMember(member) {
        // Implementation here
    }
};
