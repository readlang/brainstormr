const { UserModel } = require('./UserModel')
const { BoardModel } = require('./BoardModel')
const { CardModel } = require('./CardModel')

const User = UserModel
const Board = BoardModel
const Card = CardModel

// ASSOCIATIONS between models

User.hasMany(Board);
Board.belongsTo(User);

Board.hasMany(Card);
Card.belongsTo(Board);

module.exports = {
    User,
    Board,
    Card
}