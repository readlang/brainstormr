// this checks if request user is an admin
// placed as middleware in user - get all users endpoint

const adminValidator = async (req, res, next) => {
    // req.user will be undefined unless protectedRoute is first

    if (req.user.admin) {
        next()
    } else {
        res
        .status(403)
        .setHeader('Content-Type', 'application/json')
        .json({msg: "Unauthorized to access this resource!"})
    }
}

module.exports = adminValidator
