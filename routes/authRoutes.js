const express = require('express');
const jwt = require('jsonwebtoken');
const { register, login } = require('../controllers/authController');
const router = express.Router();

//Routes register
router.post('/register', register);

//Routes login
router.post('/login', login);

module.exports = router;