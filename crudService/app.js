const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://mongo:27017/authService", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(err));

app.use(express.json());

const postRouter = require("./routes/posts");
app.use("/posts", postRouter);

app.listen(9000, () => {
  console.log("Server started");
});
