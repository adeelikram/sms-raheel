var app=require("express").Router();
var body=require('body-parser');
app.use(body.urlencoded({extended:true}));
app.post('/Admin/Promote.html',function(req,res)
{
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://rahil:rahil123@sms.wclex.mongodb.net/MyAdmin?retryWrites=true&w=majority";
    const db = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true });
    
    var e=req.body
    res.redirect('/Admin/AdminSection.html');
    db.connect().then(err=>{
        var dbo=db.db("admission")
        
        dbo.collection(e.to).drop().catch(erroror=>console.log(erroror)).then(insert())
        function insert(){
            dbo.collection(e.from).find().toArray().then(result=>{
                dbo.collection(e.to).insertMany(result).then(checkout()).catch(erroror=>console.log(erroror))
            })
        }
        function checkout(){
                dbo.collection(e.from).drop().then(match()).catch(erroror=>console.log(erroror))
        }
        function match(){
            dbo.collection("counters").findOne((error,result)=>{
                result._id=e.to    
                dbo.collection("counters").insertOne(result).then(
                    dbo.collection("counters").findOneAndDelete({_id:e.from}).then(db.close())        
                )    
            })
        }
               
    }) 
    
})
module.exports.app=app;
