const { ObjectID } = require('mongodb');
const MongoInstance = require('../db');
const NotFoundError = require('../errors/notfound.error');

const aggregate = (elt) => {
	const newElt = { ...elt };
	newElt.id = elt._id;
	delete newElt._id;
	return newElt;
}

const fetchOneById = (id) => new Promise((resolve, reject) => {
	let _id;
	if (id.length !== 24) {
		return reject(new NotFoundError());
	}
	MongoInstance.collection.findOne({ _id }, (err, item) => {
		if (err || !item) {
			return reject(new NotFoundError());
		}
		resolve(aggregate(item));
	})
});

const fetchAll = () => new Promise((resolve, reject) => {
	const all = {};
	MongoInstance.collection.find(all).toArray((err, items) => {
		if (err) {
			console.error(err)
			return reject(err);
		}
		resolve(items.map(aggregate));
	});
});

const createOne = (todo) => new Promise((resolve, reject) => {
	MongoInstance.collection.insertOne(todo, (err) => {
		if (err) {
			return reject(err);
		}
		resolve();
	});
});

const updateOne = (id, todo) => new Promise((resolve, reject) => {
	const filter = {
		_id: new ObjectID(id)
	};
	const update = {
		$set: todo
	};
	MongoInstance.collection.updateOne(filter, update, (err) => {
		if (err) {
			return reject(err);
		}
		resolve();
	});
});

const deleteOne = (id) => new Promise((resolve, reject) => {
	MongoInstance.collection.deleteOne({ _id: new ObjectID(id) }, (err) => {
		if (err) {
			return reject(err);
		}
		resolve();
	});
});

module.exports = {
	fetchOneById,
	fetchAll,
	createOne,
	updateOne,
	deleteOne,
};