const express = require('express');
const bodyParser = require("body-parser");
const { TodoTable } = require('./src/tables');
const cors = require('cors');

const app = express();
const port = 5000;
app.use(cors());

app.use(express.json());


app.get('/todos', async (req, res) => {
  const todos = await TodoTable.findAll();
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = await TodoTable.create(req.body);
  res.json(todo);
});

app.patch('/todos/:id', async (req, res) => {
  const todo = await TodoTable.findByPk(req.params.id);
  if (!todo) return res.sendStatus(404);
  todo.completed = req.body.completed;
  await todo.save();
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const todo = await TodoTable.findByPk(req.params.id);
  if (!todo) return res.sendStatus(404);
  await todo.destroy();
  res.sendStatus(204);
});

app.listen(port);