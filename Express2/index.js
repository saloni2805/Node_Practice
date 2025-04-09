const express = require("express")
const app = express()

const url = require("url")

app.use(express.static("public/"))

app.get("/", (req, res) => {
  const user = [
    { name: "John", age: 20 },
    { name: "Jane", age: 25 },
  ]

  const obj = { data: user }
  res.render("home.ejs", obj)
})

app.get("/about", (req, res) => {
  res.render("about.ejs")
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs")
})

app.get("/saveform", (req, res) => {
  const urlData = url.parse(req.url, true)
  res.send(` <h1>Congrats... </h1> 
    <h2>Your Name is <mark>${urlData.query.name}</mark>
    Your Age is <mark>${urlData.query.age}</mark> </h2>`)
})

app.use((req, res) => {
  res.status(404).send(" <h1>Page Not Found</h1> ")
})

const PORT = 3000 || process.env.PORT
const HOST = "127.0.0.1"

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`)
})
