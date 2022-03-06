const express = require('express');
const router = express.Router();

const AccountsController = require('../Auth/SignUp');
const LoginController = require('../Auth/Log')

router.post("/signup", AccountsController.signup);
router.get("/signin", LoginController.signin);

module.exports = router;