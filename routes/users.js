var express = require('express');
var router = express.Router();
const userController = require('../controller/Users');
const authController = require('../controller/Auth');
const authenticateToken = require('../middleware/Authenticate');

/**
     // ! BREEZE_494 Express.js
     *
     * +Register & +Login
     */
// Register
router.post('/register',authController.register);
// Login
router.post('/login', authController.login);


// Role
router.get('/role', authenticateToken, roleController.index);
router.post('/role', authenticateToken, roleController.store);
router.put('/role/:id', authenticateToken, roleController.update);
router.delete('/role/:id', authenticateToken, roleController.destroy);

// Permission
router.get('/permission', authenticateToken, permissionController.index);
router.post('/permission', authenticateToken, permissionController.store);
router.put('/permission/:id', authenticateToken, permissionController.update);
router.delete('/permission/:id', authenticateToken, permissionController.destroy);



// Route for Users
router.get('/user', authenticateToken, userController.list);
router.get('/user/:id', userController.retrieve);
router.put('/user/:id', userController.update);
router.delete('/user/:id', userController.destroy);

// Route for Karyawans

module.exports = router;