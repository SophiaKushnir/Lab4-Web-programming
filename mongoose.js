const mongoose=require('mongoose');
const connStr ="mongodb+srv://Admin:Admin123@cluster0.extet.mongodb.net/mydb";
const options ={
    useUnifiedTopology:true,
    useNewUrlParser: true,
    useCreateIndex: true
}
mongoose.Promise = global.Promise;
mongoose.connect(connStr,options).then(()=>{
    console.log("mongodb connect...")
});
module.exports=mongoose;