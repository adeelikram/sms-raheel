var app = require('express').Router();
var body=require('body-parser')
app.use(body.urlencoded({ extended: true }));

app.post('/public_Attend/public_Attend.html', function (req, res) {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://rahil:rahil123@sms.wclex.mongodb.net/MyAdmin?retryWrites=true&w=majority";
  const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  db.connect().then(error=>{
    
    console.log(req.body.class)
    var dbo = db.db(req.body.class)
    if (req.body.btn1 != undefined) {
      dbo.listCollections().toArray().then(result => {
        console.log(result)
        res.render('Date.ejs', {
          name: req.body.class,
          db: result
        })
      })
    }
    if (req.body.btn != undefined) {

      var date = req.body.date;
      var Class = req.body.name;

      var dbo = db.db(Class)
      dbo.collection("" + date).find().toArray().then(result => {

        res.render('public_attend.ejs', {
          db: result,
          name: Class
        })
      })
    }
  })
})
module.exports.app = app;