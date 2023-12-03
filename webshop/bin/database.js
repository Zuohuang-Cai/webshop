let mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'bit_academy',
    password: 'bit_academy',
    database: 'webshop'
});

module.exports = pool;