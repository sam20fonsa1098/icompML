const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Pacoquinh1!2',
    database: 'icompML'
});

module.exports = connection;