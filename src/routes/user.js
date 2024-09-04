const express = require('express')
const {signUpUser,signInUser,signUpAdmin,updateUser,deleteUser,getAllUser} = require('../controller/user')
const {adminOnly} = require('../middlewares/index')
const router = express.Router()

// route - /api/v1/user/signup-admin
router.post('/signup-admin', signUpAdmin);

// route - /api/v1/user/signup-user
router.post('/signup-user', signUpUser);

// route - /api/v1/user/signin
router.post('/signin', signInUser);

// route - /api/v1/user/update/userId?adminId=1234
router.put('/update/:userId',adminOnly, updateUser);

// route - /api/v1/user/delete/userId?adminId=1234
router.delete('/delete/:userId',adminOnly, deleteUser);


// This is test route
// route - /api/v1/user/all
router.get('/all',getAllUser)

module.exports = router
