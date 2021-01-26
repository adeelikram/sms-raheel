var app = require("express").Router();
var body = require('body-parser');
app.use(body.urlencoded({ extended: true }));
app.post('/Admin/StudentData.html', function (req, res) {
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://rahil:rahil123@sms.wclex.mongodb.net/MyAdmin?retryWrites=true&w=majority";
    const db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    db.connect().then(err => {
        db.connect(err => {
            try {
                if (err) throw err;
            } catch (error) { res.send("<h2>" + err + "</h2>") }
            var dbo = db.db("admission")
            dbo.collection(req.body.class).find().toArray().then(result => {
                res.render("data.ejs", {
                    db: result,
                    name: req.body.class,
                })
            })
        })

    })
})
    module.exports.app = app;
