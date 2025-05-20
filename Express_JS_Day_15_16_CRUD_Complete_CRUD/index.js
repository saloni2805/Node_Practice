const express = require('express')
const app = express()

const PORT = 3000 || process.env.PORT;
const HOST = '127.0.0.1';


// static file serve
app.use(express.static('public/'))



// POST data
app.use(express.urlencoded({ extended: true }))

// url
var url = require('url');


// json data parse
app.use(express.json());


// DB connection
var connection = require('./config/db')

app.get('/', (req, res) => {
    res.render('home.ejs');
})


app.get('/registration', (req, res) => {
    res.render('registration.ejs')
})



app.post('/saveform', (req, res) => {
    // res.send(req.body)

    const { useremail, userpass, usermobile, userdob } = req.body;


    // create table users(user_id INT PRIMARY KEY AUTO_INCREMENT, 
    // useremail VARCHAR(200), userpass VARCHAR(100), usermobile VARCHAR(20), userdob date, created_at TimeStamp)

    var sql = `insert into users(useremail,userpass,usermobile,userdob,created_at) values('${useremail}','${userpass}','${usermobile}','${userdob}',NOW())`;

    // res.send(sql)


    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            console.log("Data Insertion Faild ")
        }

        else {
            console.log("Data Inserted Successfully.....")
        }


    })



    // res.send("User Registartion DOne....")

    res.redirect('/userdata')


})


app.get('/userdata', (req, res) => {

    var sql = `select * from users`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            console.log('data not fetched...')
        }

        else {
            console.log(result);
            console.log("Data Fetched ....")

            const obj = { data: result }

            res.render('userdata.ejs', obj)

        }
    })
    // res.send("User Data....")
})

// ******************************************


app.get('/delete/:id', (req, res) => {

    console.log(req.params.id)
    const id = req.params.id;

    var sql = `delete from users where user_id='${id}'`


    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            console.log("Faild To Delete...")
        }

        else {
            console.log(result)
            console.log("User Deleted Successfully")
        }
    })
    // res.send("<h1>Deleted....</h1>" + req.params.id)

    res.redirect('/userdata')
})


// edit operation

app.get('/edit', (req, res) => {

    var result = url.parse(req.url, true).query;
    console.log(result);

    var id = result.id;
    // res.send("Edit Page.." + id)


    // fetched data from table 
    var sql = `select * from users where user_id='${id}'`;
    // res.send(sql)

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            console.log("Faild To Fetched...")
        }
        else {
            console.log(result[0]);
            console.log("Data Fetched Successfully...")

            const obj = { data: result[0] }

            res.render('edit.ejs', obj)

        }
    })

    // res.send("Data Fetched")


})


// edit user route
app.post('/edituser', (req, res) => {
    // res.send(req.body)
    const { useremail, userpass, usermobile, userdob, user_id } = req.body

    var sql = `update users set useremail='${useremail}',userpass='${userpass}',usermobile='${usermobile}',
    userdob='${userdob}' where user_id='${user_id}'`;
    // res.send(sql)

    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            console.log("Faild to Update")

        }
        else {
            console.log("User Updated Successfully...")

        }
    })

    res.redirect("/userdata")
    



})

app.listen(PORT, HOST, () => {
    console.log("Server Is Running.....")
})



