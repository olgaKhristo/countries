const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('./middlewere/logger');
const countryRouter = require('./routers/countries');
//Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

//Routes
app.use('/countries', countryRouter);

module.exports = app;