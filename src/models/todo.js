import mongoose from 'mongoose';

if (mongoose.models.Todo) {
  delete mongoose.models.Todo;
}

const Todo = mongoose.model(
  'Todo',
  mongoose.Schema({
    name: { type: String, required: true },
    priority: { type: String, required: true },
    completed: { type: Boolean, required: true },
  })
);
export default Todo;

export function create(newTodo, result) {
  newTodo
    .save()
    .then((res) => {
      console.log('created todo: ', { id: res.id, ...newTodo });
      result(null, { id: res.id, ...newTodo });
    })
    .catch((err) => {
      console.log('error: ', err);
      result(err, null);
    });
}
export function getAll(result) {
  console.log(result);
  Todo.find()
    .then((res) => {
      console.log('todos: ', res);
      result(null, res);
    })
    .catch((err) => {
      console.log('error: ', err);
      result(null, err);
    });
}
export function findById(id, result) {
  console.log(id);
  Todo.findById(id)
    .then((res) => {
      if (res != null) {
        console.log('found todo: ', res);
        result(null, res);
      } else {
        console.log('not found todo: ', id);
        result({ kind: 'not_found' }, null);
      }
    })
    .catch((err) => {
      console.log('error: ', err);
      result(null, err);
    });
}
export function updateById(id, body, result) {
  Todo.updateOne({ id }, body)
    .then((res) => {
      console.log(res);
      if (res.matchedCount > 0) {
        console.log('updated todo: ', { id, ...body });
        result(null, { id, ...body });
      } else {
        console.log('not found todo: ', id);
        result({ kind: 'not_found' }, null);
      }
    })
    .catch((err) => {
      console.log('error: ', err);
      result(null, err);
    });
}
export function remove(id, result) {
  Todo.deleteOne({ id })
    .then((res) => {
      if (res.deletedCount > 0) {
        console.log('deleted todo with id: ', id);
        result(null, res);
      } else {
        console.log('not found todo: ', id);
        result({ kind: 'not_found' }, null);
      }
    })
    .catch((err) => {
      console.log('error: ', err);
      result(null, err);
    });
}
