import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

const Data = () => {
  const [users, setUsers] = useState([])

  // GET data
  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/students")
    console.log(res.data)
    setUsers(res.data)
  }

  // Side Effect
  useEffect(() => {
    fetchUsers()
  }, [])

  // Delete data
  const deleteUser = async (id) => {
    const confirm = window.confirm("Are you sure? ")
    if (confirm) {
      await axios.delete(`http://localhost:5000/students/${id}`)
      fetchUsers()
    } else {
      return
    }
  }

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Student Data</h1>
        <hr />

        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>SR No</th>
                <th>ID</th>
                <th>Student Name</th>
                <th>Student Email</th>
                <th>Student Course</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.course}</td>
                  <td>
                    <i
                      onClick={() => deleteUser(user.id)}
                      className="bi bi-trash fw-bold"
                      style={{ cursor: "pointer", color: "crimson" }}
                    ></i>
                  </td>
                  <td>
                    <Link to={`/edit/${user.id}`}>
                      <i
                        className="bi bi-pencil fw-bold"
                        style={{ cursor: "pointer", color: "blue" }}
                      ></i>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Data
