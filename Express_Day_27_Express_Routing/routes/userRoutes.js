const express=require('express')
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('users/home.ejs')
})

router.get('/contact',(req,res)=>{
    res.render('users/contact.ejs')
})


module.exports=router;