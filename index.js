const express =  require('express');
const app =  express();
const path = require('path');
const port = 8000;
//npm install express-ejs-layouts     to install for layout
const expressLayouts = require('express-ejs-layouts');


// rendering database file
const db = require('./config/mongoose');

//adding static files
app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style ans scripts from sub pages in to layout

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//use express router
app.use('/',require('./routes'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
// app.set('views', path.join(__dirname, 'views/view_home));

app.listen(port,function(err){
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Yes! My Server is running on Port " ${port}`);
});