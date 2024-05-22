
//const users=[{id:1, username:"batman", password: "x"}];

module.exports=class User{
    constructor(username, password)
    {
        this.username=username;
        this.password=password;
    }

};


            
       
    


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

   








