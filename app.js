const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const errorMiddlewre = require('./middlewares/error-middleware');

dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/auth'));

app.use(errorMiddlewre);

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
