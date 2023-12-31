const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const { expressjwt } = require("express-jwt");

const path = require("path"); //required for deployment

app.use(express.json());
app.use(morgan("dev"));
mongoose.set("strictQuery", false);

app.use(express.static(path.join(__dirname, "client", "dist"))); // middleware for deployment  //dist for vite and build for cra
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MongoDB");
});
app.use(
  "/api/main",
  expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] })
);
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/main/ted", require("./routes/tedRouter"));
app.use("/api/main/comments", require("./routes/commentsRouter"));

app.use((err, req, res, next) => {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(err.status);
  }
  return res.send({ errMsg: err.message });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html")); // middleware for deployment // dist for vite
});
app.listen(8800, () => {
  console.log("listening on port 8800");
});
