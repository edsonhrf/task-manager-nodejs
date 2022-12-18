const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find((user) => user.username === username);

  if (!user) {
    return response.status(400).json({ error: "User not found!" });
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.some(
    (users) => users.username === username
  );

  if (userAlreadyExists) {
    return response.status(404).json({ erro: "User already exists." });
  }

  users.push({
    id: uuidv4(),
	  name, 
	  username, 
	  toDos: []
  });
});

app.get('/toDos', checksExistsUserAccount, (request, response) => {
  const { user } = request;

  return response.json(user.toDos);
});

app.post('/toDos', checksExistsUserAccount, (request, response) => {

  const { title, deadline } = request.body;

  const { user } = request;

  const toDo = {
    id: uuidv4(),
    title,
    deadline: new Date(deadline), 
    done: false, 
	  created_at: new Date()
  }

  user.toDos.push(toDo);

  return response.status(201).json(user);
});

app.put('/toDos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { title, deadline } = request.body;
  const { id } = request.params;

  const toDo = user.toDos.find(toDo => toDo.id === id);

  if (!toDo) {
    return response.status(404).json({ error: "To-Do not found!" });
  }

  toDo.title = title;
  toDo.deadline = new Date(deadline);
  
  return response.json(toDo);
});

app.patch('/toDos/:id/done', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const toDo = user.toDos.find(toDo => toDo.id === id);

  if (!toDo) {
    return response.status(404).json({ error: "To-Do not found!" });
  }

  toDo.done = true;

  return response.json(toDo);
});

app.delete('/toDos/:id', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  const { id } = request.params;

  const todoIndex = user.toDos.findIndex(toDo => toDo.id === id);

  if (todoIndex === -1) {
    return response.status(404).json({ error: "To-Do not found!" });
  }

  //splice
  user.toDos.splice(todoIndex, 1);

  return response.status(204).json(); 
});

module.exports = app;