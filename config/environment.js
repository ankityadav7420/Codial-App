const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});
const development={
    name:'development',
    asset_path:'/assets',
    session_cookie_key:'blahsomething',
    db:'codial_development',
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',  
        port:587,   //TLS security
        secure: false,
        auth:{
            user:'ankitsuperman537',
            pass:'@ankit742069'
        }
    },
    google_client_id: "40615214052-788e6h4n6743ptjqnorue2d9s2ui2c89.apps.googleusercontent.com", // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    google_client_secret: "BDOCEpToOyukkrk8Vo9cIkim", // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }

}
 
const production={
    name:'production',
    // asset_path: process.env.CODIAL_ASSET_PATH,
    // session_cookie_key:'ALos1sAPKlLukycJU9DeMwcciuagotBw',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp:{
        service:'gmail',
        host:'smtp.gmail.com',  
        port:587,   //TLS security
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    // google_client_id: "40615214052-788e6h4n6743ptjqnorue2d9s2ui2c89.apps.googleusercontent.com", // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    // google_client_secret: "BDOCEpToOyukkrk8Vo9cIkim", // e.g. _ASDFA%KFJWIASDFASD#FAD-
    // google_call_back_url: "http://codial.com/users/auth/google/callback",
    // jwt_secret:process.env.CODEIAL_JWT_SECRET,
    
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_RURL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,

    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);






// userEmail = process.env.USER_EMAIL
// userPassword = process.env.USER_PASSWORD