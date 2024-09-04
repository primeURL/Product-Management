// Utility class for Error Handling

class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode
    }
}

module.exports = ErrorHandler
