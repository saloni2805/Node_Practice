const mysql = require("mysql2")

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "new_db",
  password: "",
})

connection.connect((err) => {
  if (err) console.log("Error, Connection Failed")
  else console.log("Success")
})

module.exports = connection
