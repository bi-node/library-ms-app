const express = require('express');
const authRouter = require('./routes/auth-router');
const librarymemberRouter=require('./routes/librarymember-routers')
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const pool = require('./db'); // Import the pool instance


const app = express();
app.use(cors()); // Add this line to enable CORS for all routes




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../', 'client')));
app.use(express.static(path.join(__dirname, '../', 'client','images')));

//routers
app.use('/auth', authRouter);
app.use('/members',librarymemberRouter);


const PORT = process.env.PORT || 3000;
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
