const express = require("express")
const app = express()

const PORT = 3000 || process.env.PORT
const HOST = "127.0.0.1"

// middleware
// static file serve

app.use(express.static("public/"))

//req.body
app.use(express.urlencoded({ extended: true }))

// db connection
var connection = require("./config/db")

// *********************************************

var multer = require("multer")

// file upload

// Returns a StorageEngine implementation configured to store files on the local file system.
const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, cb) => {
    //store unique file name using current time i.e Date.now()
    cb(null, Date.now() + file.originalname)
  },
})

const upload = multer({ storage: storage })

app.get("/", (req, res) => {
  res.render("home.ejs")
})

app.post("/saveform", upload.single("file"), async (req, res) => {
  try {
    // console.log(new Date().getTime())
    // console.log(Date.now())
    // res.send("<h2>Profile Created Successfully...!</h2>")

    // Create table profile(profile_id INT Primary KEY AUTO_INCREMENT, username VARCHAR(100), file VARCHAR(200));

    var filename = req.file.filename

    var sql = `insert into profile(username,file) values('${req.body.username}','${filename}')`
    await connection.execute(sql)

    // res.send({
    //     file: req.file,
    //     data: req.body,
    //     sql: sql
    // })

    // res.redirect('/userprofiles')

    res.send(`<script>
            
            alert('Profile Created Successfully');
            window.location.href='/userprofiles'
            
            
            </script>`)
  } catch (err) {
    console.log(err)
    res.status(500).send("Internal Server Error")
    return
  }
})

app.get("/userprofiles", async (req, res) => {
  var sql = `select * from profile`
  const result = await connection.execute(sql)
  console.log(result[0])

  // res.send(result[0]);

  const obj = { data: result[0] }

  res.render("userprofiles.ejs", obj)
})

app.get("/edit/:id", async (req, res) => {
  var id = req.params.id

  var sql = `select * from profile where profile_id='${id}' `
  const result = await connection.execute(sql)
  console.log(result[0])

  // res.send("Edit user")
  // res.send(result[0])

  const obj = { data: result[0][0] }
  res.render("editprofile.ejs", obj)
})

// Delete
app.get("/delete/:id", async (req, res) => {
  var id = req.params.id

  var sql = `delete from profile where profile_id='${id}'`
  await connection.execute(sql)

  // res.send("Deleted user"+id)

  res.redirect("/userprofiles")
})

// update user
app.post("/updateprofile", upload.single("file"), async (req, res) => {
  // res.send("<h2>Profile Updated Successfully..</h2>")

  // var filename = req.file ? req.file.filename : null;

  if (req.file) {
    var sql = `update profile set file='${req.file.filename}' where profile_id='${req.body.profile_id}'`
    await connection.execute(sql)
  }

  var sql = `update profile set username='${req.body.username}' where profile_id='${req.body.profile_id}'`
  await connection.execute(sql2)

  // res.send(
  //     {
  //         file:req.file,
  //         data:req.body,
  //         sql:sql,
  //     }
  // )

  res.redirect("/userprofiles")
})

app.listen(PORT, HOST, () => {
  console.log("Server is Up....")
})
