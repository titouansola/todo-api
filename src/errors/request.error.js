const BaseError = require('./error');

class RequestError extends BaseError {
	constructor() {
		super(500, 'Internal server error');
	}
}

module.exports = RequestError;