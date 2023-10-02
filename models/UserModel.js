const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const UserModel = sequelize.define('User', {
    // Model attributes are defined here
    userName: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
    }
}, {
    // Other model options go here
});

// custom instance methods are added with Model.prototype syntax
UserModel.prototype.getSignedJwtToken = function() {
    return jwt.sign({id:this.id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE} )
}

UserModel.prototype.matchPassword = async function(enteredPassword) {
    return ( await bcrypt.compare(enteredPassword, this.password) || enteredPassword === this.password ) //////////////////// only for development
}

module.exports = {
    UserModel
}


/*
DataTypes:
TEXT - store unlimited length string
BOOLEAN
INTEGER
FLOAT
DATE
UUID

*/