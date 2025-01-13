const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        status: 404,
        success: false,
        error: `Sorry can't find that`
    })
}

module.exports = notFoundMiddleware