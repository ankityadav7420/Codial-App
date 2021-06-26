
const User = require('../models/user');

//user profile
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}



// updating name and sending 401 code if unauthorizes person doing
module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}


// module.exports.profile = function(req, res){
//     if (req.cookies.user_id){
//         User.findById(req.cookies.user_id, function(err, user){
//             if (user){
//                 return res.render('user_profile', {
//                     title: "User Profile",
//                     user: user
//                 })
//             }else{
//                 return res.redirect('/users/sign-in');
//             }
//         });
//     }else{
//         return res.redirect('/users/sign-in');

//     }    
// }
//rendering sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render("user_sign_up",{
        title:"codial | sign up"
    })
}
//rendering sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    return res.render("user_sign_in",{
        title:"codial | sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}



//sign in and create a session using nomal coe
//git checkout -b manual-local-auth    first change the branch

// module.exports.createSession = function(req , res){
//     //steps to authentication
//     //find the user
//     User.findOne({email: req.body.email}, function(err, user){
//         if (err){console.log('error in finding user sighning in');return}
//         //handle user found
//         if(user){
//             //handle passord mis-matching
//             if(user.password !=req.body.password){
//                 return res.redirect('back');
//               //  alert("possword not maching");
//             }
//          //handle session creation
//           res.cookie('user_id', user.id);
//          return res.redirect('/users/profile');

//         }else {
//             //handle user not found
//             return res.redirect('back');
           
//         }
//         });   
// }

//  //sign in and create s session for user using passport
module.exports.createSession= function(req,res){
    return res.redirect('/');
    //return res.redirect('/users/profile');

}

//logout part
module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}