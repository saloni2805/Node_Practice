const express = require("express")
const app = express()

app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.render("home.ejs")
})

app.post("/success", (req, res) => {
  const candidate_data = req.body
  res.render("success.ejs", { data: candidate_data })
})

const PORT = 3000
const HOST = "127.0.0.1"

app.listen(PORT, HOST, () => {
  console.log(`server is running on http://${HOST}:${PORT}`)
})
