const express = require('express');
const router = express.Router();

const verifyToken = require("../middlewares/auth.middleware")
const authorizedRoles = require("../middlewares/role.middleware")
const customerController = require('../controllers/customer.controller')

router.get('/', customerController.findAll);
router.post('/', customerController.create);
router.get('/:username', customerController.findOne);
router.patch('/:username',customerController.update);
router.delete('/:username', customerController.delete);

module.exports = router;