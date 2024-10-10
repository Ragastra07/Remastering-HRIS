var express = require('express');
var router = express.Router();
const userController = require('../controller/Users');
const authController = require('../controller/Auth');
// Register
router.post('/register',authController.register);
// Route for Users
router.get('/user', userController.list);
router.get('/user/:id', userController.retrieve);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.destroy);

// Route for Karyawans

module.exports = router;