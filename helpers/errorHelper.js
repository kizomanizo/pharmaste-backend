class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    };
};

async function errorLogger(err) {
    const log = require('winston');
    log.error(`${new Date()}- Error ( ${err.statusCode}): ${err.message}`);
}

async function handleError (err, res, next) {
    await errorLogger(err);
    res.status(err.statusCode || 500).json({
        type: "Error"+' '+err.statusCode,
        title: "Error thrown!",
        message: err.message,
    })
};

module.exports = {
    ErrorHandler,
    handleError,
    errorLogger,
};