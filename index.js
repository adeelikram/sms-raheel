var express = require('express');
var ad = require('./Admissions/admission');
var admin = require('./Admin/Admin-login');
var admin2 = require('./Admin/StudentDat');
var att = require('./Admin/Attend');
var promote = require('./Admin/promote');
var mod = require('./Admin/Modify');
var p_t = require('./public_Attend/attend');
var reset = require("./Admin/reset_pass")
var app = express();
app.use(p_t.app);
app.use(mod.app);
app.use(ad.router);
app.use(admin.app);
app.use(admin2.app);
app.use(att.app);
app.use(promote.app);
app.use(reset.app)
app.use(express.static('.'));

app.get('/', function (req, res) {
    res.render('index.html');
});

app.listen(process.env.PORT || 3000)

app.post("/", function (req, res) {
    var mongo = require("mongodb").MongoClient
    var mongod = new mongo("mongodb+srv://rahil:rahil123@telser-dz1yl.mongodb.net/MyAdmin", { useNewUrlParser: true })
    mongod.connect().then(err => {
        res.redirect("/")
        mongod.db("admin").admin().listDatabases((err, result) => {
            for (var i = 0; i < result.databases.length; i++) {
                var arr = result.databases[i].name
                if (!(arr == "admin" || arr == "config" || arr == "local" || arr == "MyAdmin")) {
                    destroy()
                }
                function destroy() {
                    mongod.db(arr).dropDatabase()
                }
            }
            mongod.db("admin").listCollections().toArray().then(db.close())

        })
    })
})