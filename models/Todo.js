const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: { type: String, default: "" },
  description: { type: String, default: "" },
  filename: { type: String },
  path: { type: String },
  originalname: { type: String },
  mimetype: { type: String },
  size: { type: String },
  isCompleted: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now() }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
