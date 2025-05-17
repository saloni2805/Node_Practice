var mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_js_10am_apr',
    password: '',
    port: '3307'
})


connection.getConnection((err, result) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("DB Connection Done....")
    }
})


module.exports = connection;
