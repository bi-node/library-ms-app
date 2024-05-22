const pool = require('../db'); // Adjust the path if necessary
//const users=[{id:1, username:"batman", password: "x"}];

module.exports=class User{
    constructor(username, password)
    {
        this.username=username;
        this.password=password;
    }

    // static findUsername(username){
    //     return users.find(user=>user.username==username);
    // }

    static async findUsername(username) {
        const client = await pool.connect();
        try {
            const resultset = await client.query('SELECT * FROM users ');
            const result=resultset.rows;
            const finding=result.find(x=>x.username===username);
            return finding;
            //return result.rows[0];
        } finally {
            client.release();
        }
            
       
 
    }
}


            
       
    


    // async save() {
    //     const client = await pool.connect();
    //     try {
    //         const result = await client.query(
    //             'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    //             [this.username, this.password]
    //         );
    //         return result.rows[0];
    //     } finally {
    //         client.release();
    //     }
    // }

   








