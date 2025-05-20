const express = require("express")
const app = express()
var multer = require("multer")

const PORT = 5000 || process.env.PORT
const HOST = "127.0.0.1"

app.use(express.urlencoded({ extended: true }))

const storage = multer.diskStorage({
  destination: "public/uploads",
  filename: (file, req, cb) => {
    cb(null, Date.now() + file.originalName)
  },
})

const upload = multer({ storage: storage })

app.get("/", async (req, res) => {
  res.render("home.ejs")
})

app.get("/manage_sliders", async (req, res) => {
  res.render("manage_sliders.ejs")
})

app.get("/add_slider", async (req, res) => {
  res.render("add_slider.ejs")
})

app.post("/saveform", async (req, res) => {})

app.listen(PORT, HOST, () => {
  console.log(`Server is up on http://${HOST}:${PORT}`)
})
