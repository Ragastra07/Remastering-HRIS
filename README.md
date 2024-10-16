# setup-be-express
setup express

# note
//////////////////[using middleware]///////////////////
const express = require('express');
const checkRole = require('../middleware/checkRole');
const checkPermission = require('../middleware/checkPermission');
const router = express.Router();

router.get('/admin', checkRole(['admin']), (req, res) => {
  res.send('Admin Dashboard');
});

router.get('/edit-post', checkPermission(['edit post']), (req, res) => {
  res.send('Edit Post Page');
});

module.exports = router;
/////////////////////////////////////