const { sql, sequelize } = require('../config/db')
const { User, Site, Post, Comment, Vote } = require('../models/associationsIndex')

const getTest = async (req, res, next) => {
    try {
        const example = await sql`
            SELECT * FROM xx
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
        await User.sync({alter: true}) 
        await Site.sync({alter: true})
        await Post.sync({alter: true})
        await Comment.sync({alter: true})
        await Vote.sync({alter: true})
        
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