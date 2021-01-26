var app = require("express").Router();
var body = require('body-parser');
app.use(body.urlencoded({ extended: true }));
app.post('/Admin/Attendence.html', function (req, res) {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://rahil:rahil123@sms.wclex.mongodb.net/MyAdmin?retryWrites=true&w=majority";
    const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    db.connect().then(err => {
        var e = new Date();
        var dbo = db.db("admission")
        dbo.collection(req.body.class).find().toArray().then(result => {
            res.render('SAttend.ejs', {
                db: result,
                val: req.body.class,
                date: e.getDate(),
                month: e.getMonth(),
                year: e.getFullYear()
            })
        })
    })
    if (req.body.btn13 != undefined) {
        var c = req.body.class
        var date_collec = req.body.month + "_" + req.body.date + "_" + req.body.year
        var e = req.body
        res.redirect("/Admin/AdminSection.html")
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://rahil:rahil123@sms.wclex.mongodb.net/MyAdmin?retryWrites=true&w=majority";
        const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        db.connect().then(err => {
            var dbo = db.db("admission")
            var dbdate = db.db(c)
            dbdate.collection(date_collec).drop().catch(error => {}).then(create())
            function create() {
                dbo.collection(c).find().toArray().then(result => {
                    var array = []
                    for (var i = 0; i < result.length; i++) {
                        var temp = ""
                        if (e["p" + i]) temp = e["p" + i]
                        else if (e["a" + i]) temp = e["a" + i]
                        else temp = e["l" + i]
                        array[i] = { _id: result[i]._id, name: result[i].name, attendence: temp }
                    }
                    dbdate.collection(date_collec).insertMany(array)
                })
            }
        })
    }
})
module.exports.app = app;