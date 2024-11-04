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

/**
     // ! SPETIE_494 Express.js
     *
     * +Role & +Permission
     */
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
router.get('/karyawan', authenticateToken, karyawanController.index);
router.post('/karyawan', karyawanController.store);
router.put('/karyawan/:id', karyawanController.update);

// Route for Karyawan Resign
router.get('/karyawan/resign', authenticateToken, resignController.index);
router.post('/karyawan/resign', authenticateToken, resignController.store);
router.put('/karyawan/resign/:id', authenticateToken, resignController.update);
router.delete('/karyawan/resign/:id', authenticateToken, resignController.destroy);

// Route for Karyawan PHK
router.get('/karyawan/phk', authenticateToken, phkController.index);
router.post('/karyawan/phk', authenticateToken, phkController.store);
router.put('/karyawan/phk/:id', authenticateToken, phkController.update);
router.delete('/karyawan/phk/:id', authenticateToken, phkController.destroy);

// Route for Pelanggaran
router.get('/pelanggaran', authenticateToken, pelanggaranController.index);
router.get('/pelanggaran-all', authenticateToken, pelanggaranController.indexAll);
router.post('/pelanggaran', authenticateToken, pelanggaranController.store);
router.put('/pelanggaran/:id', authenticateToken, pelanggaranController.update);
router.delete('/pelanggaran/:id', authenticateToken, pelanggaranController.destroy);

// Route for Pelatihan
router.get('/pelatihan', authenticateToken, pelatihanController.index);
router.get('/pelatihan-all', authenticateToken, pelatihanController.indexAll);
router.post('/pelatihan', authenticateToken, pelatihanController.store);
router.put('/pelatihan/:id', authenticateToken, pelatihanController.update);
router.delete('/pelatihan/:id', authenticateToken, pelatihanController.destroy);

// Route for Karir
router.get('/karir', authenticateToken, karirController.index);
router.get('/karir-all', authenticateToken, karirController.indexAll);
router.post('/karir', authenticateToken, karirController.store);
router.put('/karir/:id', authenticateToken, karirController.update);

// Route for Divisi
router.get('/divisi', authenticateToken, divisiController.index);
router.post('/divisi', authenticateToken, divisiController.store);
router.put('/divisi/:id', authenticateToken, divisiController.update);

// Route for Jabatan
router.get('/jabatan', authenticateToken, jabatanController.index);
router.post('/jabatan', authenticateToken, jabatanController.store);
router.put('/jabatan/:id', authenticateToken, jabatanController.update);

// Route for Posisi
router.get('/posisi', authenticateToken, posisiController.index);
router.post('/posisi', authenticateToken, posisiController.store);
router.put('/posisi/:id', authenticateToken, posisiController.update);



module.exports = router;