const env = require('../helper/env');
const mysql = require('mysql2')


const connect = mysql.createConnection({
    host: env.HOST,
    user: env.USER,
    password: env.PASSWORD,
    database: env.NAME,
    dateStrings: 'date' 
})

module.exports = connect;
