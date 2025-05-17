import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams, Link } from "react-router-dom"

const UserForm = () => {
  const [data, setData] = useState({ name: "", email: "", course: "" })

  const nav = useNavigate()
  const { id } = useParams()

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const getStudent = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/students/${id}`)
      const { name, email, course } = response.data[0]

      setData({
        name: name || "",
        email: email || "",
        course: course || "",
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      getStudent(id)
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (id) {
        console.log(data.course)
        await axios.put(`http://localhost:5000/students/${id}`, data)
        alert("Updated successfully!")
      } else {
        await axios.post("http://localhost:5000/add_students", data)
        alert("Added successfully!")
      }
      setData({ name: "", email: "", course: "" })
      nav("/data")
    } catch (err) {
      console.error("Submission error:", err)
    }
  }

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Student Data</h1>
        <hr />
        <div className="d-flex justify-content-center align-items-center">
          <Link to="/data" className="btn btn-primary mt-2 px-3">
            Show Data
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-white rounded w-50 mx-auto"
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter Name
            </label>
            <input
              type="text"
              className="form-control"
              value={data.name || ""}
              onChange={handleChange}
              name="name"
              id="name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Enter Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={data.email || ""}
              onChange={handleChange}
              id="email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="course" className="form-label">
              Enter Course
            </label>
            <select
              className="form-select"
              name="course"
              id="course"
              value={data.course || ""}
              onChange={handleChange}
              required
            >
              <option value="Select">Select</option>
              <option value="ReactJS">ReactJS</option>
              <option value="NodeJS">NodeJS</option>
              <option value="Mongo">Mongo</option>
              <option value="MySQL">MySQL</option>
            </select>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-primary mt-3 px-3">
              {id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default UserForm
