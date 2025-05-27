const express = require("express")
const router = express.Router()
// import db connection
const connection = require("../config/db")

router.get("/", (req, res) => {
  return res.status(200).json({ message: "API Calling....." })
})

// How to create Rest API- using GET / POST/ Put / Patch / Delete HTTP Methods

// createUser

router.post("/createuser", async (req, res) => {
  try {
    // var sql = `create table profile(profile_id INT PRIMARY KEY AUTO_INCREMENT,
    //  username VARCHAR(200), useremail VARCHAR(200), userpass VARCHAR(100))`;

    const { username, useremail, userpass } = req.body
    var sql = `insert into profile(username,useremail,userpass) values('${username}','${useremail}','${userpass}')`

    await connection.execute(sql)
    return res.status(201).json({ message: "user Created Successfully" })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Internal Server error" })
  }
})

// getuser
router.get("/getusers", async (req, res) => {
  try {
    const result = await connection.execute("select * from profile")
    return res
      .status(200)
      .json({
        messgae: "Data fetched Successfully",
        data: result[0],
        success: true,
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal Server Error", success: false })
  }
})

// delete
router.delete("/delete/:id", async (req, res) => {
  try {
    var id = req.params.id
    const sql = `delete from profile where profile_id='${id}'`
    await connection.execute(sql)

    return res
      .status(200)
      .json({ message: "User Deleted Successfully", success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal Server Error", success: false })
  }
})

module.exports = router
