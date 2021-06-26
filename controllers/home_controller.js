const post = require('../models/post');
const User = require('../models/user');


// module.exports.home = function(req,res){
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

//         post.find({})
//         .populate('user')
//         .populate({
//             path:'comments',
//             populate:{
//                 path:'user'
//             }
//         })
//         .exec(function(err, posts){

//              User.find({},function(err,users){
//                 return res.render('home', {
//                     title: "Codeial | Home",
//                     posts:  posts,
//                     all_users:users

//                 });
//              })
//         });
// }

// async await

module.exports.home = async function(req,res){

    try{

    let posts = await post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    let users = await User.find({});
    return res.render('home', {
        title: "Codeial | Home",
        posts:  posts,
        all_users:users

    });
}catch(err){
    console.log('Error',err);
    return;
}
}