// do this second afret models. for step 3 go to routes

const Country = require('../models/Country');

const index = async (req, res) => {
    try{
        const countries = await Country.getAll();
        res.status(200).json(countries);

    }catch(err){
        res.status(500).json({error: err.message});
    }

}
const show = async (req, res) => {
    try{
        //get name
        const name = req.params.name.toLowerCase();

        //get country 
        const country = await Country.getOneByCountryName(name);
        //return the response
        res.status(200).json(country);

    }catch(err){
        res.status(404).json({error: err.message});
    }

}

const  create = async (req, res) => {
    try{
        const data = req.body;
        const newCountry = await Country.create(data);
        res.status(201).json(newCountry);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const destroy = async (req, res) => {
    try{
        const name = req.params.name.toLowerCase();
        const country = await Country.getOneByCountryName(name);
        const deletedCountry = await country.destroy(); //deletedCountry is  = result
        res.status(200).end();
      
    }catch(err){ 
        res.status(404).json({error: err.message});
    }
}

module.exports = { index, show, create, destroy};