const City = require("../models/City");

// do this second after models. for step 3 go to routes



const index = async (req, res) => {
    try{
        const city = await City.getAllNames();
        res.status(200).json(city);

    }catch(err){
        res.status(500).json({error: err.message});
    }

}
const show = async (req, res) => {
    try{
        //get name
        const name = req.params.name.toLowerCase();

        //get city 
        const city = await City.getOneByName(name);
        //return the response
        res.status(200).json(city);

    }catch(err){
        res.status(404).json({error: err.message});
    }

}

const  create = async (req, res) => {
    try{
        const data = req.body;
        const newCity = await City.create(data);
        res.status(201).json(newCity);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const destroy = async (req, res) => {
    try{
        const name = req.params.name.toLowerCase();
        const city = await City.getOneByName(name);
        const deletedCity = await city.destroy(); //deletedCity is  = result
        res.status(200).end();
      
    }catch(err){ 
        res.status(404).json({error: err.message});
    }
}

const update = async (req, res) => {
    try{
        const name = req.params.name.toLowerCase();
        const city = await City.getOneByName(name);
        req.body.country_id ||= city.country_id;
        req.body.population ||= city.population;
       
        const updatedCity = await city.update(req.body);
        res.status(200).json(updatedCity);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = { index, show, create, destroy, update};