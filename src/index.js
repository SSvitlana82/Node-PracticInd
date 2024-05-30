// src/index.js

import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  const data = { message: 'Hello world!' };
  res.json(data);
});
app.use('/numbers', (req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  const err = new Error('помилка');
  next(err);
});

app.get('/numbers', (req, res) => {
  const data = Math.round(Math.random() * 100);
  res.json(data);
});
app.use('*', (req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
  });
});
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
