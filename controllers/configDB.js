const mysql = require('mysql2/promise');
const logger = require('./logger');
require('dotenv').config();

const config = {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB
}

let connection;

(
    async () => {
        connection = mysql.createConnection(config);
        logger.info("Database Promise connection established");
    }
)();

module.exports = connection;




