import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('templates'));

const loggerMiddleware = (req, res, next) => {
  console.log('nouvelle requête entrante');
  next();
};

app.use(loggerMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
