let express=require('express');
let app=express();
const User = require('./models/user');
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
})
app.listen(process.env.PORT||8080);
console.log('Run server!');

app.get('/getusers',function(req,res){
    User.find(function(err,data){
        console.log(data);
        res.send(data);
    })
})
app.post('/adduser',function(req,res){
    const data = req.body;
    console.log(data);
    const user = new User(data);
    user.save(function(err,data){
        if(err){
            console.log(err.message);
            return;
        }
        console.log(data);
        res.send(data);
    })
})
app.post('/deleteuser',function(req,res){
    console.log(req.body);
    User.remove({_id:req.body.id},function(err,data){
        res.send('remove user');
    })
})
app.post('/updateuser',function(req,res){
    console.log(req.body);
    User.updateOne({_id:req.body.id},{name:req.body.name,age:req.body.age,pass:req.body.pass,grp:req.body.grp},function(err,data){
        if(err){
            console.log(err.message);
            return;
        }
        res.send(data);
    })
})
