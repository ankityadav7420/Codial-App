module.exports.home = function(req,res){
    // return res.end('<h1> express is up for codial</h1>');
    res.cookie('user_id', 25);
    console.log(req.cookies);
    return res.render('home',{
        title : "Home"
    });

}