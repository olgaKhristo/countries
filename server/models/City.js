const db = require("../database/connect");

class City {
    constructor({ city_id, name, country_id, population }) {
        this.city_id = city_id;
        this.name = name;
        this.country_id = country_id;
        this.population = population;      
    }
    static async getAllNames() {
        const response = await db.query('SELECT name FROM city;');
        if(response.rows.length === 0){
            throw new Error('No cities found');
        }
        return response.rows.map(city => new City(city));
    }

    static async getOneByName(cityName){
        const response = await db.query('SELECT * FROM city WHERE name = $1;', [cityName]);
        
        if(response.rows.length != 1){
            throw new Error('No city found');
        }
        return new City(response.rows[0]);
    }

    static async create(data){
        const {name, country_id, population} = data;
        let response = await db.query('INSERT INTO city (name, country_id, population) VALUES ($1, $2, $3) RETURNING name;', [name, country_id, population]);
        const cityName = response.rows[0].name;
        const newCity = await City.getOneByName(cityName);
        return new City(newCity);
    }
    async  destroy(req, res){
        let response = await db.query('DELETE FROM city WHERE name = $1 RETURNING *;', [this.name]);
        return new City(response.rows[0]);
    }

    async update(data){
        const { country_id, population} = data;
        let response = await db.query('UPDATE city SET country_id = $1, population = $2 WHERE name = $3 RETURNING *;', [country_id, population, this.name]);
        const cityName = response.rows[0].name;
        const updatedCity = await City.getOneByName(cityName);
        if(response.rows.length != 1){
            throw new Error('Unable to update city');
        }
        return new City(updatedCity);
    }
}
module.exports = City;