const express = require('express');
const authRouter = require('./routes/auth-router');
const librarymemberRouter = require('./routes/librarymember-routers')
const bookRouter = require('./routes/book-router')
const userRouter = require('./routes/user-router')
const bookcopyRouter = require('./routes/bookcopy-router')
const checkoutRouter = require('./routes/checkoutentry-router')
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db'); // Import the pool instance

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Add this line to enable CORS for all routes

const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('client'));
app.use(express.static('public'));

//routers
app.use('/auth', authRouter);
app.use('/members', librarymemberRouter);
app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/bookcopy', bookcopyRouter);
app.use('/checkoutentries', checkoutRouter);



app.listen(PORT, () => console.log(`connected to ${PORT}`));

// Example route to test the database connection
app.get('/test-DB', async (req, res) => {
  try {
    const client = await pool.connect();
    console.log("success");
    const result = await client.query('SELECT * FROM users where id=1');
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to the database');
  }
});
