// two ways to interact with database: with sql and sequelize

// import environment variables
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' });
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// set up sql connection
const postgres = require('postgres')
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;
const sql = postgres(URL, { ssl: 'require' });
async function getPgVersion() {
    const result = await sql`select version()`;
    console.log(result);
}
getPgVersion();

// set up sequelize connection
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    dialect: 'postgres',
    ssl: 'true',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
})

module.exports = {
    sql,
    sequelize
}