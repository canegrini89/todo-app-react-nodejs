const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/todo-app", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));
