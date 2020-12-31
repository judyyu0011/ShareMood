

class OverCapacityError extends Error {

    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, OverCapacityError);
    }
    
}

module.exports = {
    OverCapacityError: OverCapacityError
};