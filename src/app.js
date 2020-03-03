import express from 'express';

const app = express();

const indexRouter = require('./todos');

app.use('/todos', indexRouter);

export default app;
