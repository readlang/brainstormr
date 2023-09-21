// this will check if there is auth in the header and make sure its a JWT
// this will decode the JWT and use the decoded id to look up the user
// this user will be appended to the request and passed on to other requests (req.user)
// placed as middleware at protected endpoints

const { User } = require('../models/associationsIndex');
const jwt = require('jsonwebtoken')

const protectedRoute = async (req, res, next) => {
    let token;
    
    console.log("Headers: ", req.headers)
    console.log("Cookie: ", req.headers.cookie)

    // this is using JWT - header (bearer) authentication
    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
    //     token = req.headers.authorization.split(" ")[1]
    // } 

    // this is using JWT - cookie authentication
    if (req.headers.cookie && req.headers.cookie.startsWith('token') ) {
        token = req.headers.cookie.split("=")[1]
    }

    if (!token) {
        next( new Error('Not authorized to access this route (auth)'))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("Decoded JWT: ", decoded)

        req.user = await User.findByPk(decoded.id)
        // console.log("User: ", req.user)
        
        next()
    } catch (error) {
        next( new Error('Error processing the JWT token! (auth)') )
    }
}

module.exports = protectedRoute