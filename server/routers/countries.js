//this is number 3 to go after all
const {Router} = require('express');
const cc = require('../controllers/countries'); // country controllers  => cc

const countryRouter = Router() 

countryRouter.get('/', cc.index);
countryRouter.get('/:name', cc.show);
countryRouter.post('/', cc.create);
countryRouter.delete('/:name', cc.destroy);
countryRouter.patch('/:name', cc.update);

module.exports = countryRouter;