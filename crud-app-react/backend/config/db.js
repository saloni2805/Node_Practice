var mysql = require("mysql2/promise")

// const pool = mysql.createPool({
//   user: "root",
//   host: "localhost",
//   database: "students_db",
//   password: "",
// })

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "students_db",
  port: "3307",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// pool.connect()
pool.getConnection((err, result) => {
  if (err) {
    console.log(err)
  } else {
    console.log("Connection DB Successful....")
  }
})

module.exports = pool
