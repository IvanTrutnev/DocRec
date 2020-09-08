const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use("/api", require("./routes/users"));

const PORT = config.get("port") || 5000;

const start = async () => {
  try {
    const mongoUri = process.env.mongoUri;
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(mongoUri, options);
    app.listen(PORT, () => console.log(`App has been started in port ${PORT}`));
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

start();
