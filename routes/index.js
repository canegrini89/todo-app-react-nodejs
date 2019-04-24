const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const path = require("path");
const { unlink } = require("fs-extra");

router.post("/upload", async (req, res) => {
  try {
    const todo = await new Todo();

    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.filename = req.file.filename;
    todo.path = `/img/uploads/${req.file.filename}`;
    todo.originalname = req.file.originalname;
    todo.mimetype = req.file.mimetype;
    todo.size = req.file.size;

    await todo.save();

    return res.status(200).send(req.file);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  let todos = await Todo.find();

  if (typeof req.query.id !== "undefined") {
    todos = await Todo.findById(req.query.id);
  }
  if (typeof req.query.title !== "undefined") {
    todos = await Todo.find({ title: req.query.title });
  }
  if (typeof req.query.isCompleted !== "undefined") {
    todos = await Todo.find({ isCompleted: req.query.isCompleted });
  }

  res.json(todos);
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findById(id);

    res.json(todo);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findByIdAndDelete(id);
  await unlink(path.resolve("./public" + todo.path));

  res.send(todo);
});

module.exports = router;
