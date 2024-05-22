const pool=require('./db');

const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
console.log(result);

