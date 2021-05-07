const express = require('express');
const router = express.Router();



const usersController = require('../controllers/users_controller');
router.get('/r_user',usersController.r_user);

module.exports = router;
// ehere is the the issue> show me  ///shoe me the error 