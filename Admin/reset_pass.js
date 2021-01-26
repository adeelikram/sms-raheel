var router=require("express").Router
var app=router()
var body=require("body-parser")
app.use(body.urlencoded({extended:true}))
app.post("/Admin/reset_pass.html",function(req,res){
        var email=req.body.email
        res.redirect("/Admin/login.html")
        var nodemailer = require('nodemailer');
        
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          secure:false,
          auth: {
            user: 'nilanoor3@gmail.com',
            pass: 'Rahil123@'
          },tls:{
              rejectUnauthorized:false
          }
        });
        
        var mailOptions = {
          from: 'nilanoor3@gmail.com',
          to: email,
          subject: 'RESET EMAIL',
          text: 'Email:rahil.ikram67@gmail.com     Password:rahil4444'
        };
        transporter.sendMail(mailOptions,function(err,info){
            console.log(info)
        })
})
module.exports.app=app

