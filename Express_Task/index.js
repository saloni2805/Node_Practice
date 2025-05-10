var express = require("express")
const app = express()
// import connection
var connection = require("./config/db")

const PORT = 3000 || process.env.PORT
const HOST = "127.0.0.1"

// static file serve
app.use(express.static("public/"))

// var url = require("url")

// body
app.use(express.urlencoded({ extended: "true" }))

// json data
app.use(express.json())

app.get("/", (req, res) => {
  res.render("home.ejs")
})

// -----> ADDING DATA <------
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
  res.redirect("/udata")
})

// -----------------> FETCHING DATA TO SHOW <--------------------
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

// ---------------------> DELETEING DATA <------------------
app.get("/delete/:id", (req, res) => {
  const id = req.params.id
  var sql = `delete from users where id= '${id}'`
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      console.log("Data Not Deleted")
    } else {
      console.log(result)
      console.log("Data Deleted Successfully...")
      res.redirect("/udata")
    }
  })
})

// -----------------------> EDITING DATA <-----------------------
app.get("/edit/:id", (req, res) => {
  const id = req.params.id
  var sql = `select * from users where id = '${id}'`
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      console.log("Data Not Fetched")
    } else {
      // Data comes in a array object format [{},{}]
      console.log("Data Fetched Successfully...")
      const obj = { data: result[0] }
      res.render("edit.ejs", obj)
    }
  })
})

app.post("/updateform", (req, res) => {
  const { name, email, id } = req.body
  // const id = req.params.id
  console.log("iiiiiddd", id, name, email)
  var sql = `update users set name = '${name}', email = '${email}' where id='${id}'`
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      console.log("Data Not Updated")
    } else {
      console.log(result)
      console.log("Data Updated Successfully...")
      res.redirect("/udata")
    }
  })
})

app.listen(PORT, HOST, () => {
  console.log(`Server is running.....`)
})
