const express = require('express')
const {signUpUser,signInUser} = require('../controller/user')
const router = express.Router()

// route - /api/v1/user/signup
router.post('/signup', signUpUser);

// route - /api/v1/user/signin
router.post('/signin', signInUser);


module.exports = router
