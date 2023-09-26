const express = require('express');
const router = express.Router();
const {
    getBoards,
    postBoard,

    getMyBoards,

    updateBoard,
    deleteBoard,
} = require('../controllers/boardController')

const {
    getCardsForBoard
} = require('../controllers/cardController')

const adminValidator = require('../middlewares/utils/validators')
const protectedRoute = require('../middlewares/auth')

// add on /board/ routes
router.route('/')
    .get(protectedRoute, adminValidator, getBoards) // admin only route
    .post(protectedRoute, postBoard)

// /board/myboards
router.route('/myboards')
    .get(protectedRoute, getMyBoards)

router.route('/:boardId')
    .put(protectedRoute, updateBoard)
    .delete(protectedRoute, deleteBoard)

router.route('/:boardId/cards')
    .get(protectedRoute, getCardsForBoard)

module.exports = router