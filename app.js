const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    const { mongoUri } = process.env;
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongoUri, options);
    app.listen(PORT, () => console.log(`App has been started in port ${PORT}`)); // eslint-disable-line no-console
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
    process.exit(1);
  }
};

start();
