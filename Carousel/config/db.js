var mysql = require("mysql2/promise")

const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  database: "carousel_db",
  password: "",
  port: "3307",
})

// pool.connect()
pool.getConnection((err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log(result)
    console.log("Connection DB Successfully....")
  }
})

module.exports = pool
