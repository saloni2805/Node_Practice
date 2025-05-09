var mysql = require("mysql2")
const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "user_db",
  password: "",
})

// check connect or not

// Optional - we can directly export connection
connection.connect((err) => {
  if (err) {
    console.log(err)
    console.log("DB Connection Faild...")
    return
  } else {
    console.log("DB Connection Successfully ....")
  }
})

// if (connection) {
//   console.log("Successfully connected DB")
// } else {
//   console.log("Connection failed !")
// }

module.exports = connection
