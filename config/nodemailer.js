const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
// const join  = require('path');

//setting up mail transporter
let transporter = nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',  
    port:587,   //TLS security
    secure: false,
    auth:{
        user:'ankitsuperman537',
        pass:'@ankit742069'
    }
});

//setting up template for mail

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template', err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}