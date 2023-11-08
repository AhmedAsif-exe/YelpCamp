class ExpressError extends Error {
    constructor (mssg, statusCode)
    {
        super();
        this.mssg = mssg;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;