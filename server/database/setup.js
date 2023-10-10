require("dotenv").config();
const fs = require("fs");

const db = require("./connect");
const sql = fs.readFileSync(__dirname+"/countries.sql").toString();

db.query(sql)
.then((data) => {db.end()
console.log("Database setup complete")
})
.catch((err) => console.log(err))