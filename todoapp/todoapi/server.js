const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./config/db');
const Todo = require('./models/Todo');

const app = express();
const port = 8080;

mongoose.Promise = global.Promise;
console.log('dbURL:', db.url);
mongoose.connect(db.url);

app.options('localhost:4200', cors());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

require('./routes')(app);
require('./error_handler')(app);

app.listen(port);

console.log('todo list RESTful API server started on:', port);
