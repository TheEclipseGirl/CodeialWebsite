const express=require('express');
const app=express();
const port=8000;

//use of express router----------
// middleware!!! ./routes/index.js
 app.use('/',require('./routes'));
//  --------------------------------
app.listen(port,function(err){
    if(err){
        console.log('Error',err);
        console.log(`Error in running the server:${err}`);
    }
    console.log(`server is running on port:${port}`);
});