// sudo npm install mongoose

const mongoose = require('mongoose');
const env = require('./environment');

// connecting data base
mongoose.connect(`mongodb://localhost/${env.db}`);
const db = mongoose.connection;
// erroe handelling durning connectimh databse 
db.on('error',console.error.bind(console,'Error in connecting to mongodb'));
db.once('open',function(){
    console.log('connected to database :: mongodb');

});
// exporting databse

module.exports = db;