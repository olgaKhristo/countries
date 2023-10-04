// start here to write function (model) then go to controller
const db = require("../database/connect");

class Country{
    constructor({country_id, name, capital, population, languages, fun_fact, map_image_url}) {
        this.country_id = country_id;
        this.name = name;
        this.capital = capital;
        this.population = population;
        this.languages = languages;
        this.fun_fact = fun_fact;
        this.map_image_url = map_image_url;

    }

 static async getAll() {
    const response = await db.query('SELECT name FROM country;');
    if(response.rows.length === 0){
        throw new Error('No countries found');
    }
    return response.rows.map(country => new Country(country));
 }

 static async getOneByCountryName(countryName){
    const response = await db.query('SELECT * FROM country WHERE LOWER(name) = $1;', [countryName]);
    //console.log(response);
    if(response.rows.length != 1){
        throw new Error('No country found');
    }
    return new Country(response.rows[0]);
 }
static async create(data){
    const {name, capital, population, languages} = data;
    let response = await db.query('INSERT INTO country (name, capital, population, languages) VALUES ($1, $2, $3, $4) RETURNING name;', [name, capital, population, languages]);
    const countryName = response.rows[0].name;
    const newCountry = await Country.getOneByCountryName(countryName);
    return new Country(newCountry);
}

//delete is not statis
async  destroy(req, res){
    let response = await db.query('DELETE FROM country WHERE name = $1 RETURNING *;', [this.name]);
    return new Country(response.rows[0]);

}
//add  PATCH route that updates a country's details
async update(data){
    const { capital, population, languages} = data;
    let response = await db.query('UPDATE country SET  capital = $1, population = $2, languages = $3 WHERE name = $4 RETURNING *;', [capital, population, languages, this.name]);
    const countryName = response.rows[0].name;
    const updatedCountry = await Country.getOneByCountryName(countryName);
    if(response.rows.length != 1){
        throw new Error('Unable to update country');
    }
    return new Country(updatedCountry);

}
}

module.exports = Country;