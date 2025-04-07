const express = require("express")
const app = express()

const menu = `
<ul>
<li><a href="/">Home</a></li>
<li><a href="/about">About</a></li>
<li><a href="/contact">Contact</a></li>
</ul>
    `
// Route for home page
app.get("/", (req, res) => {
  res.send(`${menu}</br> <h1>Home Page</h1>`)
})

// Route for about Page
app.get("/about", (req, res) => {
  const arr = ["Saloni", "Sayani", "Pooja"]
  res.send(arr)
})

// Route for contact Page
app.get("/contact", (req, res) => {
  const obj = {
    name: "saloni",
    contact: 6767676767,
  }
  res.send(obj)
})

const PORT = 3000
const HOST = "127.0.0.1"
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`)
})
