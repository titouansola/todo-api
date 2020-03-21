const createInstanceDB = require('../db');
const generateID = require('uuid').v4;
const NotFoundError = require('../errors/notfound.error');

const TODOS_COLLECTION_NAME = 'todos';

async function fetchOneById(id) {
	const db = await createInstanceDB();
	const todo = db.get(TODOS_COLLECTION_NAME).find({ id }).value();

	if (!todo) {
		throw new NotFoundError();
	}
	return todo;
}

async function fetchAll() {
	const db = await createInstanceDB();
	return db.get(TODOS_COLLECTION_NAME);
}

async function createOne(todo) {
	todo.id = generateID();
	const db = await createInstanceDB();
	return db.get(TODOS_COLLECTION_NAME).push(todo).write();
}

async function updateOne(id, todo) {
	const db = await createInstanceDB();
	const toUpdate = db.get(TODOS_COLLECTION_NAME).find({ id });

	if (!toUpdate.value()) {
		throw new NotFoundError();
	}
	return toUpdate.assign(todo).write();
}

async function deleteOne(id) {
	const db = await createInstanceDB();
	return db.get(TODOS_COLLECTION_NAME).remove({ id }).write();
}

module.exports = {
	fetchOneById,
	fetchAll,
	createOne,
	updateOne,
	deleteOne,
};