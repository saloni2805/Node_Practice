import React from "react"
import { useState } from "react"
import axios from "axios"

const Home = () => {
  const [user, setUser] = useState({
    username: "",
    useremail: "",
    userpass: "",
  })

  const dataHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const saveForm = async (e) => {
    try {
      e.preventDefault()

      alert("User Account Created Successfully")
      console.log(user)

      await axios.post("http://localhost:5000/api/createuser", user)
    } catch (err) {
      console.log(err)
      console.log("faild to create user")
    }
  }
  return (
    <div>
      <h1> Home Page</h1>

      <h2> Front end - React </h2>
      <hr />

      <form action="" method="post" onSubmit={(e) => saveForm(e)}>
        <label htmlFor="">ENter Your Name</label>
        <input
          type="text"
          name="username"
          id=""
          value={user.username}
          onChange={(e) => dataHandler(e)}
        />
        <br />
        <br />

        <label htmlFor="">Enter your email</label>
        <input
          type="email"
          name="useremail"
          id=""
          value={user.useremail}
          onChange={(e) => dataHandler(e)}
        />

        <br />
        <br />

        <label htmlFor="">Enter Your Password</label>
        <input
          type="password"
          name="userpass"
          id=""
          value={user.userpass}
          onChange={(e) => dataHandler(e)}
        />

        <br />
        <br />

        <button style={{ border: "solid black 3px" }}>Create Account</button>
      </form>
    </div>
  )
}

export default Home
