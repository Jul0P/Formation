const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/some-html', (req, res) => {
  res.send('<html><body><h1>bonjour html</h1></body></html>');
});

app.get('/some-json', (req, res) => {
  const user = { age: 22, name: 'Jane' };
  res.json(user);
});

app.get('/transaction', (req, res) => {
  const transaction = [100, 2000, 3000];
  console.log(req.headers);
  console.log(req.body);
  res.json(transaction);
});

app.get('/exo-query-string', (req, res) => {
  console.log(req.query);
  const age = req.query.age;
  const id = req.query.id;
  res.send(`<html><body><h1>L'id : ${id} a ${age} ans</h1></body></html>`);
});

app.get('/get-user/:userId', (req, res) => {
  const userId = req.params.userId;
  res.send(`<html><body><h1>ID: ${userId}</h1></body></html>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
