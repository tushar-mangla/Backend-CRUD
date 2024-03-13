// Common error handler
const errorHandler = (res, errorMessage, statusCode = 500) => {
    console.error(errorMessage);
    return res.status(statusCode).json({ error: errorMessage });
};


module.exports = {
    errorHandler
}