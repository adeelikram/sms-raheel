var app=require("express").Router();
var body=require('body-parser');
app.use(body.urlencoded({extended:true}));
app.post('/Admin/Modify.html',function(req,res)
{
    
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://rahil:rahil123@sms.wclex.mongodb.net/MyAdmin?retryWrites=true&w=majority";
    const db = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology:true });
    db.connect().then(err => {
    var e=req.body    
    res.redirect('/Admin/AdminSection.html');
    var dbo=db.db("admission")
         if(e.btn_cng_1!=undefined){
         dbo.collection(e.cng_class).findOneAndUpdate({_id:Number(e.cng_id)},{
             $set:{name:e.cng_name,father:e.cng_father,address:e.cng_address,cellno:e.cng_cellno}})
             .catch(erroror=>console.log(erroror))
        }
        else{
            dbo.collection(e.del_class).findOneAndDelete({_id:Number(e.del_id)}).catch(erroror=>console.log(erroror))
        }

    })
    
    
    
})
module.exports.app=app;
    