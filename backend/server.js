const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
//Db config
const URI = require('./config/keys').MongoURI;
app.use(cors());
app.use(express.json());
//Connect to DB

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('DB CONNECTED');
})
.catch((err) => console.log("Can't connect to db."));
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log('Mongo DB is connected');
// }).on('error', error=> console.log('Error connecting to db', error));

const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
