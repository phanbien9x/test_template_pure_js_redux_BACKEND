import md5 from 'md5';
import Todo, { create, getAll, findById, updateById, remove } from '../models/todo.js';

export function createTodo(req, res) {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  const newTodo = new Todo({
    name: req.body.name,
    priority: req.body.priority,
    completed: req.body.completed,
  });
  create(newTodo, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Todo.',
      });
    else res.send(data);
  });
}

export function getAllTodo(req, res) {
  console.log(res);
  getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Todos.',
      });
    else res.send(data);
  });
}

export function findTodoById(req, res) {
  findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Todo with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Todo with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
}

export function updateTodoById(req, res) {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  updateById(req.params.id, req.body, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Todo with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating Todo with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
}

export function removeTodo(req, res) {
  remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Todo with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Todo with id ' + req.params.id,
        });
      }
    } else res.send({ message: `Todo was deleted successfully!` });
  });
}
