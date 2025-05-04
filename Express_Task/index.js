var express = require("express")
const app = express()

const PORT = 3000 || process.env.PORT
const HOST = "127.0.0.1"

// static file serve
app.use(express.static("public/"))

// var url = require("url")

// body
app.use(express.urlencoded({ extended: "true" }))

// json data
app.use(express.json())

// import connection
var connection = require("./config/db")

app.get("/", (req, res) => {
  res.render("home.ejs")
})

app.post("/saveform", (req, res) => {
  // res.send("Form Successfully Submitted...")

  // Object Destructring
  const { Name, Email } = req.body

  var sql = `insert into users(Name,Email) values('${Name}','${Email}')`
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      console.log("Data Faild to insert")
    } else {
      console.log(result)
      console.log("Data Inserted Successfully...")
    }
  })
  // navigattionn
  res.redirect("/udata")
})

app.get("/udata", (req, res) => {
  var sql = `select * from users`
  connection.query(sql, (err, result) => {
    if (err) {
      console.log("Data Not fetched")
      console.log(err)
    } else {
      console.log("Data Fetched Successfully...")
      console.log(result)

      // Data Traversing
      const obj = { data: result }

      res.render("udata.ejs", obj)
    }
  })
})

app.listen(PORT, HOST, () => {
  console.log(`Server Is running.....`)
})
