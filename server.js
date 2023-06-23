const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(morgan("dev"));

mongoose.set("strictQuery", false);

mongoose.connect(
  DB_URL,
  (err) => {
    if (err) throw err;
    console.log("Connected to the Database!");
  },
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  })
);

app.use("/api/todo", require("./routes/todoRouter"));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});
