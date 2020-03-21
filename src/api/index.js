const apiRoutes = require('express').Router();
const BaseError = require('../errors/error');

apiRoutes.use('/todo', require('./todo'));

apiRoutes.use((err, req, res, next) => {
	if (err instanceof BaseError) {
		res.status(err.code).json(err.toJSON());
	} else {
		res.status(500).json({ message: 'Internal  server error' });
	}
});

module.exports = apiRoutes;