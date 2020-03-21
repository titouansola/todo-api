const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

module.exports = async () => {
	const adapter = await new FileSync('src/db/db.json');
	const db = await lowdb(adapter);
	db.read();

	return db;
};