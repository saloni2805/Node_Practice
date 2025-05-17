const express = require("express") // Web framework for building the server
const cors = require("cors")
// (Cross-Origin Resource Sharing) Allows your frontend (e.g., React) to access your API from another domain or port.
const connection = require("./config/db")

const app = express()
app.use(express.json()) // Use express.json() to parse incoming JSON requests
app.use(cors())

// Get all students
app.get("/students", async (req, res) => {
  try {
    const sql = `select * from students`
    const [students] = await connection.execute(sql)
    // Uses res.json() or res.send() to return data
    res.json(students) // returns an array of student objects
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// Get student by id
app.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params
    const sql = `select * from students where id = '${id}'`
    const [students] = await connection.execute(sql)
    res.json(students)
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// Create student
app.post("/add_students", async (req, res) => {
  const { name, email, course } = req.body
  try {
    const sql = `INSERT INTO students (name, email, course) VALUES ('${name}', '${email}', '${course}')`
    await connection.execute(sql)
    res.send({ message: "Student added" })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// Update student
app.put("/students/:id", async (req, res) => {
  const { name, email, course } = req.body
  const { id } = req.params
  console.log(id)
  try {
    const sql = `UPDATE students SET name = '${name}', email = '${email}', course='${course}' WHERE id = '${id}'`
    await connection.execute(sql)
    res.send({ message: "Student updated" })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// Delete student
app.delete("/students/:id", async (req, res) => {
  const { id } = req.params
  try {
    const sql = `DELETE FROM students WHERE id = '${id}'`
    await connection.execute(sql)
    res.send({ message: "Student deleted" })
  } catch (err) {
    res.status(500).send({ error: err.message })
  }
})

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"))
