var express = require("express")
// db connection
var connection = require("./config/db")
const app = express()

const PORT = 3000 || process.env.PORT
const HOST = "127.0.0.1"

// middleware
app.use(express.static("public/"))

// req.body
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("home.ejs")
})

app.post("/saveform", async (req, res) => {
  try {
    console.log(req.body)
    const { id, name, email, course } = req.body

    var sql = `insert into students
    (name,email,course)
     values('${name}','${email}','${course}')`

    //  connection.query replace
    await connection.execute(sql)
    console.log("Data Inserted Successfully....")

    res.redirect("/studenstdata")
  } catch (err) {
    console.log(err)
    console.log("Faild to Insert Data....")
    return
  }
})

// Student data
app.get("/studenstdata", async (req, res) => {
  try {
    var sql = `select * from students`
    const [result] = await connection.execute(sql)
    const obj = { data: result }
    res.render("studentsdata.ejs", obj)
    console.log("Data Fetched Successfully..")
  } catch (err) {
    console.log(err)
    console.log("Data faild to fetch..")
    return
  }
})

// delete
app.get("/delete/:id", async (req, res) => {
  try {
    var id = req.params.id

    var sql = `delete from students where id='${id}'`
    await connection.execute(sql)
    // res.send("<h1>Deleted...</h1>" + id)

    res.redirect("/studenstdata")
  } catch (err) {
    console.log(err)
    console.log("Faild to Delete Products")
  }
})

app.get("/edit/:id", async (req, res) => {
  try {
    var id = req.params.id
    var sql = `select * from students where id='${id}'`

    const [result] = await connection.execute(sql)

    const obj = { data: result[0] }

    res.render("editstudent.ejs", obj)
  } catch (err) {
    console.log(err)
    console.log("Data faild to fetched ....Edit User")
  }
})

app.post("/updateform", async (req, res) => {
  try {
    const { name, email, course, id } = req.body
    console.log(req.body)

    var sql = `update products
     set 
     name='${name}',
     email='${email}',
     course='${course}',
    `

    await connection.execute(sql)

    res.redirect("/studenstdata")
  } catch (err) {
    console.log(err)
    console.log("Faild to update product data")
  }
})

app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`)
})
