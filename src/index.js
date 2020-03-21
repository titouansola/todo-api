const cors = require('cors');
const bodyParser = require('body-parser');

const app = require('express')();
// API Doc config
require('./config/api.doc')(app);

app.use(cors({
	origin: '*'
}));

app.use(bodyParser());

app.use('/api', require('./api'));

app.use((req, res) => {
	res.redirect('/api-docs');
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log('Listening on port', port);
});