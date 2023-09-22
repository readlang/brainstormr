const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,

    login,
    authenticate,
    updatePassword,
    logout,
    
    getUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController')

const {
    getBoardsForUser
} = require('../controllers/boardController')

const adminValidator = require('../middlewares/utils/validators')
const protectedRoute = require('../middlewares/auth')

// all on /user/ route
router.route('/')
    .get(protectedRoute, adminValidator, getUsers) // admin only route
    .post(postUser) // not protected - create user (signup)

router.route('/login')
    .post(login) // not protected - explicit log in

router.route('/authenticate')
    .get(authenticate) // not protected - cookie-based log in

router.route('/updatePassword')
    .put(protectedRoute, updatePassword)

router.route('/logout')
    .get(protectedRoute, logout)

router.route('/:userId')
    .get(protectedRoute, getUser)
    .put(protectedRoute, updateUser)
    .delete(protectedRoute, deleteUser)

router.route('/:userId/boards')
    .get(protectedRoute, getBoardsForUser)

module.exports = router