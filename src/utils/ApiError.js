export class ApiError extends Error {
    constructor(
        statusCode, 
        message = "Something went wrong",
        errors = [], 
        stack = "") {
        super(message) // call parent constructor with message
        this.statusCode = statusCode
        this.data = null
        this.success = false;
        this.errors = errors

        if( stack ) {
            this.stack = stack
        }else {
            Error.captureStackTrace(this, this.constructor)
        }
} }