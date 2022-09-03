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

async function connect(mysql, config){

    let connection = await mysql.createConnection(config);
    logger.info("Connected To Database Successfully");

    return connection;

}

try {
    
    connection = connect(mysql, config);

} catch (error) {

    logger.error(error);
    
}

module.exports = {
    connection: connection
}



