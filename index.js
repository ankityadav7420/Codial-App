const express =  require('express');
const app =  express();
const port = 8000;




//use express router
app.use('/',require('./routes/r_index'));


app.listen(port,function(err){
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Yes! My Server is running on Port " ${port}`);
});