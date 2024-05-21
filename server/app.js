const express = require('express');
const authRouter = require('./routes/auth-router');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors()); // Add this line to enable CORS for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../', 'client')));
app.use(express.static(path.join(__dirname, '../', 'client','images')));

app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`connected to ${PORT}`));
