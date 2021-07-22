exports.get404 = (req, res, next) => {
    const err = new Error('Not found.');
    err.statusCode = 404;
    next(err);
};

exports.allErrors = (err, req, res, next) => {
    res.status(err.statusCode || 500)
    res.json({
        error: {
            message: err.message,
            data: err.data
        }
    });
}