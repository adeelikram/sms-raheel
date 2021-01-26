var app = require("express").Router();
var body = require('body-parser');
app.use(body.urlencoded({ extended: true }));
var path = require('path');
app.get('/Admin/login.ejs', function (req, res) {
    res.render('login.');
});

app.post('/Admin/login.html', function (req, res) {

    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://rahil:rahil123@sms.wclex.mongodb.net/MyAdmin?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true });
    client.connect().then(err => {
        var dbo = client.db("MyAdmin")
         dbo.collection("authenticate").find().toArray().then(result => {
            try {
                if (err) console.log(result)
            } catch (error) {
                
            }
            if (result[0].email == req.body.email && result[0].password == req.body.password) {
                sendFile()
            }
            else reverse()
        })
        function sendFile() {
            res.sendFile(__dirname + '/AdminPortal.html');
        }
        function reverse() {
            res.send("<script src='./not_auth_user.js'></script><center><div style='margin-top:9%;margin-left:15%;margin-right:15%;background-color:lightblue;;font-size:450%'><i>You are Not Authenticated user</i></div></center>")
        }
        
        
    });

    
});


module.exports.app = app;
