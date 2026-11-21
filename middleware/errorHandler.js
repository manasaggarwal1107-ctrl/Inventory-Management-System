
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }

    if (err.code === 11000) {
        statusCode = 400;
        message = "This SKU already exists";
    }

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(error => error.message)
            .join(", ");
    }

    res.status(statusCode).json({
        success: false,
        message: message
    });
};

module.exports = errorHandler;
