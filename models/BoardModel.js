const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')

const BoardModel = sequelize.define('Board', {
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    }, 
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    },
    public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    // Other model options go here
});

module.exports = {
    BoardModel
}