//this is number 3 to go after all
const {Router} = require('express');
const cc = require('../controllers/city'); // city controllers  => cc

const cityRouter = Router() 

cityRouter.get('/', cc.index);
cityRouter.get('/:name', cc.show);
cityRouter.post('/', cc.create);
cityRouter.delete('/:name', cc.destroy);
cityRouter.patch('/:name', cc.update);

module.exports = cityRouter;