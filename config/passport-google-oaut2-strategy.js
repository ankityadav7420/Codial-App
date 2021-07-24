const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: env.google_client_id, // e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
        clientSecret: env.google_client_secret, // e.g. _ASDFA%KFJWIASDFASD#FAD-
        callbackURL: env.google_call_back_url,
    },

    function(accessToken, refreshToken, profile, done){
        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if (err){console.log('error in google strategy-passport', err); return;}
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user){
                // if found, set this user as req.user
                return done(null, user);
            }else{
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if (err){console.log('error in creating user google strategy-passport', err); return;}

                    return done(null, user);
                });
            }

        }); 
    }


));


module.exports = passport;








// clientID:"40615214052-788e6h4n6743ptjqnorue2d9s2ui2c89.apps.googleusercontent.com",
// clientSecret:"BDOCEpToOyukkrk8Vo9cIkim",
// callbackURL:"http://localhost:8000/users/auth/google/callback"