const express = require('express');
const authFilter = require('./filter/AuthFilter');
const authRouter = require('./routes/auth-router');
const librarymemberRouter = require('./routes/librarymember-routers'); // Corrected path name
const bookRouter = require('./routes/book-router');
const userRouter = require('./routes/user-router');
const bookcopyRouter = require('./routes/bookcopy-router');
const checkoutRouter = require('./routes/checkoutentry-router');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db'); // Import the pool instance

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client')));


// Routers
app.use('/auth', authRouter);
app.use(authFilter);
app.use('/members', librarymemberRouter);
app.use('/books', bookRouter);
app.use('/users', userRouter);
app.use('/bookcopy', bookcopyRouter);
app.use('/checkoutentries', checkoutRouter);

app.listen(PORT, () => console.log(`connected to ${PORT}`));
