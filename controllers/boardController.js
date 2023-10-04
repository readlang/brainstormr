const { Board } = require('../models/associationsIndex')

// get all boards, - admin only route, auth first
// working
const getBoards = async (req, res, next) => {
    try {
        const boards = await Board.findAll()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(boards)
    } catch (error) {
        next(error)
    }
}

// working
const postBoard = async (req, res, next) => {
    try {
        if (!req.body.name) throw new Error("Please provide a board name")
        const board = await Board.create({ 
            UserId: req.user.id,
            name: req.body.name
        })
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(board)
    } catch (error) {
        next(error)
    }
}

// this uses UUID rather than the PK id
const getBoard = async (req, res, next) => {
    try {
        const board = await Board.findOne({
            where: {uuid: req.params.boardId}
        })
        if (board === null) {
            res
            .status(400)
            .setHeader('Content-Type', 'application/json')
            .json( {
                error: 'Board not found',
                details: "check path & board id"
            } )
        } else {
            if (board.public === false && board.UserId !== req.user.id) {
                throw new Error("You don't have permission to access this board")
            }
            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(board)
        }
    } catch (error) {
        next(error)
    }
}

// working
const updateBoard = async (req, res, next) => {
    try {
        const board = await Board.findByPk(req.params.boardId)
        if (board.UserId !== req.user.id && !req.user.admin) {
            throw new Error("Can't modify board you don't own.")
        }
        if (req.body.name) board.name = req.body.name
        if (req.body.public) board.public = req.body.public
        const result = await board.save()
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(result)
    } catch (error) {
        next(error)
    }
}

const deleteBoard = async (req, res, next) => {
    try {
        const result = await Board.findByPk(req.params.boardId)
        if (result.UserId === req.user.id) {
            result.destroy() 
        } else {
            throw new Error("Can't delete board you don't own.")
        }
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            deletedBoard: result
        })
    } catch (error) {
        next(error)
    }
}

// working
const getMyBoards = async (req, res, next) => {
    try {
        const boards = await Board.findAll({
            where: { UserId: req.user.id }
        })
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(boards)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getBoards,
    postBoard,
    getBoard,
    updateBoard,
    deleteBoard,
    getMyBoards
}