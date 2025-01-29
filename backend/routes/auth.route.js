const express = require('express');
const { register, login, generatePasswordToken } = require('../controllers/auth.controller')
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/generate-token", generatePasswordToken);

module.exports = router;
