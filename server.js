const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const path = require("path"); //required for deployment

app.use(express.json());
app.use(morgan("dev"));

mongoose.set("strictQuery", false);

app.use(express.static(path.join(__dirname, "client", "dist"))); // middleware for deployment  //dist for vite and build for cra

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html")); // middleware for deployment // dist for vite
});

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
