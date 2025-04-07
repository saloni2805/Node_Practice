const http = require("http")
const url = require("url")

const app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" })
  // res.write(`
  //   <h1>Welcome to NodeJS Server</h1>
  //   <div style="display:flex; justify-content:center;align-items:center;flex-direction:column;padding-bottom:20px">
  //   <input type='text' placeholder='enter name'  >
  //   <input type='text' placeholder='enter contact' >
  //   <button style="padding-top:5px">Submit</button>
  //   </div>`)

  // Parse icoming url req
  // var urldata = url.parse("http://127.0.0.1:3000/",true)

  const urldata = url.parse(req.url, true)

  // ------ fetching only pathname -------
  res.write("<br>" + urldata.pathname)

  // ------ Routing ------
  if (urldata.pathname === "/") {
    res.write("<h1>Home Page</h1>")
  } else if (urldata.pathname === "/about") {
    res.write("<h1>about page</h1>")
  } else if (urldata.pathname === "/contact") {
    res.write("<h1>contact page</h1>")
  }

  // for (let i = 0; i < 10; i++) {
  //   res.write("Value of i : " + i + " ")
  // }

  res.end("")
})

const PORT = 3000
const HOST = "127.0.0.1"

app.listen(PORT, HOST, () => {
  console.log(`server running on http://${HOST}:${PORT}`)
})
