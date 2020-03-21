const expressSwaggerGen = require('express-swagger-generator');

module.exports = (app) => {
	const expressSwagger = expressSwaggerGen(app);

	const options = {
		swaggerDefinition: {
			info: {
				description: 'TODO API DOC',
				title: 'TODO',
				version: '1.0.0',
			},
			host: '',
			basePath: '/api',
			produces: "application/json",
			schemes: ['http', 'https'],
		},
		basedir: __dirname, //app absolute path
		files: ['../api/**/*.js'] //Path to the API handle folder
	};
	expressSwagger(options);
};