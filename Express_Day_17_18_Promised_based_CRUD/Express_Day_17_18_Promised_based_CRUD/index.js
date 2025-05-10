var express = require("express")
const app = express()

const PORT = 3000 || process.env.PORT
const HOST = "127.0.0.1"

// middleware
app.use(express.static("public/"))

// req.body
app.use(express.urlencoded({ extended: true }))

//url
var url = require("url")

// db connection
var connection = require("./config/db")

app.get("/", (req, res) => {
  // res.send("hello welcome to express server");

  res.render("home.ejs")
})

// form handling
app.post("/saveform", async (req, res) => {
  try {
    // res.send("<h1>Product added ...</h1>")
    console.log(req.body)

    // var sql=`create table products(pid INT PRIMARY KEY AUTO_INCREMENT,
    //  pname VARCHAR(255),pcatgory VARCHAR(100),pprice VARCHAR(50),pquantity int, pdetails TEXT)`;

    const { pname, pcategory, pprice, pquantity, pdetails } = req.body

    var sql = `insert into products
    (pname,pcatgory,pprice,pquantity,pdetails)
     values('${pname}','${pcategory}','${pprice}','${pquantity}','${pdetails}')`

    //  connection.query replace
    const result = await connection.execute(sql)

    console.log(result)
    console.log("Data Inserted Successfully....")

    res.redirect("/productdata")
  } catch (err) {
    console.log(err)
    console.log("Faild to Insert Data....")
    return
  }
})

// product data
app.get("/productdata", async (req, res) => {
  try {
    var sql = `select * from products`
    const [result] = await connection.execute(sql)
    console.log(result)

    const obj = { data: result }
    res.render("productdata.ejs", obj)

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

    var sql = `delete from products where pid='${id}'`
    await connection.execute(sql)
    // res.send("<h1>Deleted...</h1>" + id)

    res.redirect("/productdata")
  } catch (err) {
    console.log(err)
    console.log("Faild to Delete Products")
  }
})

app.get("/edit/:id", async (req, res) => {
  try {
    var id = req.params.id
    console.log(id)

    var sql = `select * from products where pid='${id}'`

    //execute method return-  [rows,fileds]
    const [result] = await connection.execute(sql)
    console.log(result[0])

    const obj = { data: result[0] }

    res.render("editproduct.ejs", obj)
    // res.send("EDit Product" + id);
  } catch (err) {
    console.log(err)
    console.log("Data faild to fetched ....Edit User")
  }
})

app.post("/updateform", async (req, res) => {
  try {
    const { pname, pcategory, pprice, pquantity, pdetails, pid } = req.body
    console.log(req.body)

    var sql = `update products
     set 
     pname='${pname}',
     pcatgory='${pcategory}',
     pprice='${pprice}',
     pquantity='${pquantity}',
     pdetails='${pdetails}'
     where pid='${pid}'`

    await connection.execute(sql)

    // res.send("Updated .....")

    res.redirect("/productdata")
  } catch (err) {
    console.log(err)
    console.log("Faild to update product data")
  }
})

app.listen(PORT, HOST, () => {
  console.log("Server is up...")
})
