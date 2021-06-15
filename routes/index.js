const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
 const usersController = require('../controllers/users_controller');
console.log('router loded');

router.get('/',homeController.home);
router.get('/users',require('./users'));


// for any futher router acces from here
//router.use('/routername',require('./routerfile'))
module.exports = router;