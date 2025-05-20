var mysql = require('mysql2')
const connection = mysql.createPool({

    user: 'root',
    host: 'localhost',
    database: 'node_js_10am_apr',
    password: '',
    port: 3307

})

// console.log(connection);
connection.getConnection((err,result)=>{

    if(err)
    {
        console.log(err)
        console.log("DB Connection faild")
    }

    else
    {
        console.log(result)
        console.log("DB Connection Successfully...")
    }
})

module.exports = connection;