var express = require("express")
// db connection
var connection = require("./config/db")
var multer = require("multer")

const app = express()
const PORT = 3000 || process.env.PORT
const HOST = "127.0.0.1"

// middleware
app.use(express.static("public/"))

// req.body
app.use(express.urlencoded({ extended: true }))

// file upload
// Returns a StorageEngine implementation configured to store files on the local file system.
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    //store unique file name using current time i.e Date.now()
    cb(null, Date.now() + file.originalname)
  },
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true)
    } else {
      cb(new Error("Only PDF files are allowed!"))
    }
  },
})
app.get("/", (req, res) => {
  res.render("job_application_form.ejs")
})

// action handle
app.post("/saveform", upload.single("file"), async (req, res) => {
  try {
    var filename = req.file.filename
    const { full_name, email, phone, position } = req.body
    var sql = `insert into applications (full_name,email,phone,position,file) values('${full_name}','${email}','${phone}','${position}','${filename}')`
    await connection.execute(sql)
    console.log("Data Inserted Successfully....")
    res.redirect("/applicationsdata")
  } catch (err) {
    console.log(err)
    console.log("Faild to Insert Data....")
    return
  }
})

// Student data
app.get("/applicationsdata", async (req, res) => {
  try {
    var sql = `select * from applications`
    // result in the form of array object
    const [result] = await connection.execute(sql)
    const obj = { data: result }
    console.log(obj)
    res.render("applicationsdata.ejs", obj)
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
    var sql = `delete from applications where id='${id}'`
    await connection.execute(sql)
    res.redirect("/applicationsdata")
  } catch (err) {
    console.log(err)
    console.log("Faild to Delete Students")
  }
})

app.get("/edit/:id", async (req, res) => {
  try {
    var id = req.params.id
    var sql = `select * from applications where id='${id}'`
    const [result] = await connection.execute(sql)
    const obj = { data: result[0] }
    console.log(obj)
    res.render("editapplication.ejs", obj)
  } catch (err) {
    console.log(err)
    console.log("Data faild to fetched ....Edit User")
  }
})

// action handle
app.post("/updateform", upload.single("file"), async (req, res) => {
  try {
    console.log("request", req?.file)
    const { full_name, email, phone, position, id } = req.body

    if (req.file) {
      var filename = req.file.filename
      var sql = `update applications
        set file='${filename}'
        where id='${id}'`
    } else {
      var sql = `update applications
        set 
        full_name='${full_name}',
        email='${email}',
        phone='${phone}',
        position='${position}'
        where id='${id}'`
    }

    await connection.execute(sql)

    res.redirect("/applicationsdata")
  } catch (err) {
    console.log(err)
    console.log("Faild to update student data")
  }
})

app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`)
})
