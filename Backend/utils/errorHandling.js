// class ErrorHandler extends Error {
//     constructor(message,statusCode){
//         super(message);
//         this.statusCode = statusCode;

//         Error.captureStackTrace(this,this.constructor)
//     }
// }
// module.exports = ErrorHandler;


class Er extends Error {
    constructor(msg,staco){
        super(msg);
        this.staco = staco;

        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports = Er;