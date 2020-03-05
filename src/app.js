import express from 'express';
const bodyParser = require('body-parser');

const app = express();
const indexRouter = require('./todos');
const initDB = require('./createTable');

app.use(bodyParser.json());

app.use('/todos', indexRouter);
app.use('/init',  initDB.makeTable);

export default app;
