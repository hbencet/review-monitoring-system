const DB_NAME = process.env.DATABASE_NAME;  
const DB_USER = process.env.DATABASE_USER;  
const DB_PASSWORD = process.env.DATABASE_PASSWORD; 
const DB_HOST = process.env.DATABASE_HOST;  
const DB_PORT = process.env.DATABASE_PORT;  

const knex = require("knex")({
  client: "pg",
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
  },
  pool: { min: 0, max: 7 },
});

module.exports = {knex:knex};