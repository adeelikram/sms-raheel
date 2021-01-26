var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/Admissions/new-Admission.ejs', function (req, res) {
    res.render("/Admissions/new-Admission");
});

router.post('/Admissions/new-Admission.html', function (req, res) {
    if (req.body.btn !== undefined) {

        var e = req.body;
        res.redirect("/")
        const MongoClient = require('mongodb').MongoClient;
        const uri = "mongodb+srv://rahil:rahil123@sms.wclex.mongodb.net/MyAdmin?retryWrites=true&w=majority";
        const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        var auto = require("mongodb-autoincrement")
        db.connect().then(err=>{
            var dbo = db.db("admission")
            for (var i = 0; i < e.in; i++) {
                insert(i)
            }
            function insert(i) {
                auto.getNextSequence(dbo, e["cl" + i], function (error, autoindex) {
                    dbo.collection(e["cl" + i]).insertOne({ _id: autoindex, name: e["n" + i], father: e["f" + i], address: e["a" + i], cellno: e["cel" + i] })
                })
            }

        })
    }
});
module.exports.router = router;
