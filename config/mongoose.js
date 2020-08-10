const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codeial-development');
// Setting up DB
const db=mongoose.connection;
// whenever we get error to connect DB
db.on('error',console.error.bind(console,"Error connecting to MongoDB"));

// When we connected to DB
db.once('open',function(){
    console.log('Connected to database::MongoDb');
});
module.exports=db;
