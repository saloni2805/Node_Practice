var mysql = require("mysql2/promise")

const pool = mysql.createPool({
  user: "root",
  host: "localhost",
  database: "job_application_db",
  password: "",
  port: "3307",
})

// pool.connect()
pool.getConnection((err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Connection DB Successfully....")
  }
})

module.exports = pool
