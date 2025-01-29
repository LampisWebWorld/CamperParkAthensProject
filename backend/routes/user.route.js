const express = require('express');
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware")
const authorizedRoles = require("../middlewares/role.middleware")
const userController = require('../controllers/user.controller');

router.get('/', userController.findAll);
router.get('/:username', userController.findOne);
router.patch('/:username',userController.update);
router.delete('/:username', userController.delete);

router.get('/admin', verifyToken, authorizedRoles("admin"), (req, res) => {
    res.json({ message: "Welcome Admin" })
})

router.get('/user', verifyToken, authorizedRoles("admin", "user"), (req, res) => {
    res.json({ message: "Welcome User" })
})

module.exports = router;