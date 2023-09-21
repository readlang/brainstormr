const { sql, sequelize } = require('../config/db')
const { User, Board, Card } = require('../models/associationsIndex')

const getTest = async (req, res, next) => {
    try {
        const example = await sql`
            SELECT * FROM users
        `
        console.log("test controller hit!")
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
            msg: "test endpoint hit", 
            data: example    
        })
    } catch (error) {
        next(error);
    }

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('-Unable to connect to the database:-', error);
    }
}

// endpoint:  /test/sync
const syncDBtables = async (req, res, next) => {
    try {
        // this (alter: true) should be avoided in production
        /* 
        //comment the below out for DB safety (can delete tables)
        await User.sync({alter: true}) 
        await Board.sync({alter: true})
        await Card.sync({alter: true})
        */
        
        console.log("All tables should be created")
        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({msg: "All tables should be created"})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getTest,
    syncDBtables
}