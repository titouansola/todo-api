const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo';
const collectionName = 'todos';

const Mongo = {
	client:  null,
	collection: null,
	connect() {
		console.log('DB :: Connecting to', MONGODB_URI);
		return new Promise((resolve, reject) => {
			MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
				if (err) {
					console.log('DB :: Error on connecting with host', MONGODB_URI);
					return reject(`DB :: Error on connecting with host ${MONGODB_URI}`);
				}
				Mongo.client = client;
				console.log(`DB :: Access to collection '${collectionName}'`);
				const db = client.db();
				console.log('DB exists :', !!db);
				Mongo.collection = db.collection(collectionName);
				console.log('Collection exists :', !! Mongo.collection);
				resolve();
			});
		});
	},
	close() {
		console.log('DB :: Closing connection...');
		Mongo.client.close();
		console.log('DB :: Connection closed');
	}
};

module.exports = Mongo;