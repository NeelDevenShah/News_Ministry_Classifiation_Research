const express = require('express');
const router = express.Router();

const {
  registeruser, login, deleteuser
} = require('../Controllers/auth_controller.js');
const fetchuser = require('../middleware/fetchuser.js');


router.post('/register', fetchuser, registeruser);
router.post('/login', login);
router.post('/deleteacc', fetchuser, deleteuser);


module.exports = router;

