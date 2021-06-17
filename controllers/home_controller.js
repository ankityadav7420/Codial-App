const post = require('../models/post');

module.exports.home = function(req,res){
    // return res.end('<h1> express is up for codial</h1>');
    // res.cookie('user_id', 25);
    // console.log(req.cookies);

    // post.find({}, function(err, posts){
    //         return res.render('home', {
    //             title: "Codeial | Home",
    //             posts:  posts
    //         });
    //     });
        // papulating user who have posted data

        post.find({}).populate('user').exec(function(err, posts){
            return res.render('home', {
                title: "Codeial | Home",
                posts:  posts
            });
        });
}