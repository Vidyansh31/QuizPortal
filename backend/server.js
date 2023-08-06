const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;


// Middleware
app.use(cors());
app.use(bodyParser.json());


// Database connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database');
});


//Starting the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });