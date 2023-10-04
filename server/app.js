const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('./middlewere/logger');
const countryRouter = require('./routers/countries');
const cityRouter = require('./routers/city');
//Middleware
app.use(express.json());
app.use(cors());
app.use(logger);

//Routes
app.use('/countries', countryRouter);
app.use('/city', cityRouter);


module.exports = app;