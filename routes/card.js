const express = require('express');
const router = express.Router();
const {
    getCards,
    postCard,
    
    updateCard,
    deleteCard,
} = require('../controllers/cardController')

const adminValidator = require('../middlewares/utils/validators')
const protectedRoute = require('../middlewares/auth')

// add on /card/ routes
router.route('/')
    .get(protectedRoute, adminValidator, getCards) // admin only route
    .post(protectedRoute, postCard)

router.route('/:cardId')
    .put(protectedRoute, updateCard)
    .delete(protectedRoute, deleteCard)

module.exports = router