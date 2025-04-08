const express = require("express")
const app = express()

// Middleware to serve static files like images
// Built in express middleware
app.use(express.static("public/"))

const menu = `
<ul>
<li><a href="/">Home</a></li>
<li><a href="/about">About</a></li>
<li><a href="/contact">Contact</a></li>
</ul>
    `
// Route for home page
app.get("/", (req, res) => {
  // res.send(`${menu}</br> <h1>Home Page</h1>`)
  res.render("home.ejs") //  ---> Server-Side data rendering <---
})

// Route for about Page
app.get("/about", (req, res) => {
  const arr = ["Saloni", "Sayani", "Pooja"]
  res.send(arr)
  // const obj = {
  //   name: "saloni",
  //   contact: 6767676767,
  // }
  // res.send(obj)
})

// Route for contact Page
app.get("/contact", (req, res) => {
  //  Data Travesing to EJS
  //  When we are passing dtata to EJS there must be passed through object {}

  // 'obj' acts as a envelop
  // cover letter
  const user = {
    name: "Saloni",
    age: 23,
    id: 34,
  }
  const obj = { data: user }
  res.render("contact.ejs", obj) //  ---> Server-Side data rendering
})

const PORT = 3000
const HOST = "127.0.0.1"
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port http://${HOST}:${PORT}`)
})
