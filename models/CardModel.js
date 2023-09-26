const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')

const CardModel = sequelize.define('Card', {
    //BoardId : int
    content: {
        type: DataTypes.TEXT,
        defaultValue: ""
    }, 
    color: {
        type: DataTypes.TEXT,
        defaultValue: "255,255,255"
    },
    position: {
        type: DataTypes.TEXT,
        defaultValue: "10,10"
    }, 
    size: {
        type: DataTypes.TEXT,
        defaultValue: "300x300"
    }
}, {
    // Other model options go here
});

module.exports = {
    CardModel
}