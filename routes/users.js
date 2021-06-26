const express = require('express');
const router = express.Router();
const passport = require('passport');


const usersController = require('../controllers/users_controller');

//if user is signed in only then he can acces the profile page
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
// router.get('/users/profile',usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);

router.get('/users/sign-up',usersController.signUp);
router.get('/users/sign-in',usersController.signIn);

//routing sign up page create
router.post('/users/create',usersController.create); 
// router.post('/users/create-session',usersController.createSession);


//passport as a middleware to authenticate
router.post('/users/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


   //sign out

router.get('/users/sign-out', usersController.destroySession);

module.exports = router;
