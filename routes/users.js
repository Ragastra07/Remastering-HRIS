var express = require('express');
var router = express.Router();
const userController = require('../controller/Users');
const authController = require('../controller/Auth');
const authenticateToken = require('../middleware/Authenticate');


// Register
router.post('/register',authController.register);
// Login
router.post('/login', authController.login);
// Route for Users
router.get('/user', authenticateToken, userController.list);
router.get('/user/:id', userController.retrieve);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.destroy);

// Route for Karyawans

module.exports = router;