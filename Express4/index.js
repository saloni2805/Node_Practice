const express = require("express")
const app = express()

app.use(express.static("public/"))

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("home.ejs")
})

app.get("/about", (req, res) => {
  res.render("about.ejs")
})

app.post("/submit", (req, res) => {
  const product_data = req.body
  res.render("details.ejs", { data: product_data })
})

const PORT = 3001 || process.env.PORT
const HOST = "127.0.0.1"
app.listen(PORT, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`)
})
