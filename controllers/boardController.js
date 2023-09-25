const { Board } = require('../models/associationsIndex')

// get all boards, - admin only route, auth first
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

const updateBoard = async (req, res, next) => {
    try {
        console.log(req.body)
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
    updateBoard,
    deleteBoard,
    getMyBoards
}