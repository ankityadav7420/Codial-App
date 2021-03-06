const express =  require('express');
const env= require('./config/environment');  // setting development envirnment
//connecting morgan   $sudo npm install morgan
const logger = require('morgan');

//creating cookies
 //install package  $sudo npm install cookie-parser
const cookieParser = require('cookie-parser');
const app =  express();
//connecting helper
require('./config/view-helpers')(app);
const path = require('path');
const port = 8000;
//npm install express-ejs-layouts     to install for layout
const expressLayouts = require('express-ejs-layouts');
// rendering database file
const db = require('./config/mongoose');
//used for session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//conecting jwt stratgy
const pasportJWT = require('./config/passport-jwt-strategy');
const passportGoogle =require('./config/passport-google-oaut2-strategy');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
//connecting sass
const sassMiddleware =require('node-sass-middleware');
//connecting flash
const flash = require('connect-flash');
const customMware = require('./config/middleware');
//connecting socket.io for chatting engine and setting chat server
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port : 5000');
// const path = require('path');

if(env.name=='develoment'){
app.use(sassMiddleware({
    src:path.join(__dirname,env.asset_path,'scss'),
    dest:path.join(__dirname,env.asset_path,'css'),
    // src: './assets/scss',
    // dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
}
//parse for decoding the form-info
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
//adding static files
app.use(express.static(env.asset_path));
//conecting uploades path availbe
app.use('/uploads',express.static(__dirname + '/uploads'));
//envirement connection logger> morgan
app.use(logger(env.morgan.mode, env.morgan.options));


app.use(expressLayouts);
//extract style ans scripts from sub pages in to layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// app.use('/users/creae-session',require('./controllers/users_controller'));
//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
// app.set('views', path.join(__dirname, 'views/view_home));

//mongo store is used to store thesession cookie in the db
app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'env.session_cookie_key',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled',
            mongoUrl: mongoose.connection._connectionString,
            mongoOptions: {}
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes/index'));
app.use('/',require('./routes/users'));



app.listen(port,function(err){
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Yes! My Server is running on Port " ${port}`);
});