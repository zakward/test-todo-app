const express = require("express");
const todoRouter = express.Router();
const Todo = require("../models/todo");

todoRouter.post("/", (req, res, next) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err, savedTodo) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(201).send(savedTodo);
  });
});

todoRouter.get("/", (req, res, next) => {
  Todo.find((err, todo) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(todo);
  });
});

todoRouter.delete("/:todoId", (req, res, next) => {
  Todo.findByIdAndDelete({ _id: req.params.todoId }, (err, deletedTodo) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(`Successfully deleted ${deletedTodo.title}`);
  });
});

module.exports = todoRouter;
