const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/data', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

const tasks = [
  { id: 1, title: 'Task 1', description: 'Description 1', isDone: false },
  { id: 2, title: 'Task 2', description: 'Description 2', isDone: true },
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/new-task', (req, res) => {
  const newTask = req.body;
  if (tasks.find((task) => task.id === newTask.id)) {
    return res.status(400).send('La tâche existe déjà'); // status 400 pour Bad Request
  }
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/update-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  // si la tâche n'existe pas cela renvoie -1
  if (taskIndex !== -1) {
    // Empêcher la modification de l'ID
    const { id, ...updateData } = req.body;
    const updatedTask = { ...tasks[taskIndex], ...updateData };
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
  } else {
    res.status(404).send('Tâche non trouvée'); // status 404 pour Not Found
  }
});

app.delete('/delete-task/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);
  // si la tâche n'existe pas cela renvoie -1
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json(deletedTask[0]);
  } else {
    res.status(404).send('Tâche non trouvée'); // status 404 pour Not Found
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
