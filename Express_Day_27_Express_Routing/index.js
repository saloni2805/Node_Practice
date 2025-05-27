const express = require('express');
const app = express();


// import userRoutes
const userRoute = require('./routes/userRoutes')

// import adminRoute
const adminRoute = require('./routes/adminRoutes')


// 
app.use('/', userRoute)

// 
app.use('/admin', adminRoute);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('server is up ..')
})



// userRoutes
// adminRoutes
// authRoutes