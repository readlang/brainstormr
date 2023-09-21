// only invoked if there is an error

const errorHandler = (err, req, res, next) => {
    console.log("-- Source: errorHandler --");
    //console.log(err.stack.split("\n", 2).join(" -"));
    console.log(err)

    res
    .status(err.statusCode || 500)
    .setHeader('Content-Type', 'application/json')
    .json({
        success: false,
        error: err.message || 'Server Error'
    });
};

module.exports = errorHandler;