const express = require("express")
const app = express() //initialize / call
var connection = require("./config/connection")

const PORT = 3000 || process.env.PORT
const HOST = "127.0.0.1"

// ----- Static file serve -----
app.use(express.static("public/"))

// ----- url package ------
// access GET method ka data
const url = require("url")

// ------ fetching data from POST method -------
// req.body ka data
// app.use(express.urlencoded({ extended: true }))

// ----- setting route ------
app.get("/", (req, res) => {
  //   res.send("<h1>Hello</h1>")
  res.render("home.ejs")
})

// ------- FORM HANDLING USING- GET -------
app.get("/saveform", (req, res) => {
  const urldata = url.parse(req.url, true).query // access only query proprty from url object
  console.log(urldata)
  // ## Implementing query inside express ##
  //   var sql = `Create Table user(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50), email VARCHAR(50)  )`
  var sql = `insert into user(name,email)values('${urldata.name}','${urldata.email}')`
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      console.log("Failed to insert data")
    } else {
      console.log(result)
      console.log("Data added Succesfuly")
    }
  })

  res.send("<h2>Form submitted successfuly</h2>")
})

// ****************************

// ------- FORM HANDLING USING- POST -------
// app.post("/saveform", (req, res) => {
//   console.log(req.body)
//   res.send("<h2>Form submitted successfuly</h2>")
// })

// listen incoming req
app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`)
})
