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
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongo DB is connected');
});
const exerciseRouter = require('./routes/exercises');
const userRouter = require('./routes/users');

app.use('/users', userRouter);
app.use('/exercises', exerciseRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
