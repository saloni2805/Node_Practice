const express = require("express")
const app = express()
var multer = require("multer")
var connection = require("./config/db")

const PORT = 5000 || process.env.PORT
const HOST = "127.0.0.1"

app.use(express.urlencoded({ extended: true }))
app.use(express.static("public/"))

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
})

const upload = multer({ storage: storage })

app.get("/", async (req, res) => {
  try {
    var sql = `select * from slider`
    const result = await connection.execute(sql)
    const obj = { data: result[0] }
    res.render("home.ejs", obj)
  } catch (e) {
    console.log(e)
  }
})

app.get("/manage_sliders", async (req, res) => {
  var sql = `select * from slider`
  const result = await connection.execute(sql)
  console.log(result[0][0])
  const obj = { data: result[0] }
  res.render("manage_sliders.ejs", obj)
})

app.get("/add_slider", async (req, res) => {
  res.render("add_slider.ejs")
})

app.post("/saveform", upload.single("slider_img"), async (req, res) => {
  try {
    const { slider_title, slider_desc } = req.body
    const file = req.file ? req.file.filename : null
    var sql = `insert into slider(slider_title, slider_desc, file) values ('${slider_title}','${slider_desc}','${file}')`
    await connection.execute(sql)
    res.redirect("/manage_sliders")
  } catch {
    console.log("Error")
  }
})

app.get("/delete/:id", async (req, res) => {
  try {
    var id = req.params.id
    var sql = `delete from slider where slider_id='${id}'`
    await connection.execute(sql)
    res.redirect("/manage_sliders")
  } catch (e) {
    console.log(e)
  }
})

// app.get("/view_slider", async (req, res) => {
//   res.render("view_slider.ejs")
// })

app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`)
})
