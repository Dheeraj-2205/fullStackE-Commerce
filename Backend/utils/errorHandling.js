class ErrorHandling extends Error{
    constructor(msg,statusCode){
        super(msg);
        this.statusCode = statusCode;

        Error.captureStackTrace(this);
    }
}

module.exports = ErrorHandling