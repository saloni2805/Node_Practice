var mysql = require("mysql2")
const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "user_db",
  password: "",
  port: 3306,
})

// check connect or not

connection.connect((err) => {
  if (err) {
    console.log(err)
    console.log("DB Connection Faild...")
    return
  } else {
    console.log("DB Connection Successfully ....")
  }
})

module.exports = connection
