const express=require('express');
const router=express.Router();


router.get('/',(req,res)=>{
    res.render('admin/admin.ejs')
})

router.get('/login',(req,res)=>{
    res.send("<h1>Login Page- Admin Panels</h1>")
})


module.exports=router;