const todoRoutes = require('express').Router();
const todoService = require('../services/todo');

/**
 * @typedef TodoEntity
 * @property {integer} id
 * @property {string} title
 * @property {boolean} done
 * @property {string} createdAt
 */

/**
 * @typedef TodoInput
 * @property {string} title
 * @property {boolean} done
 * @property {string} createdAt
 */

/**
 * @typedef Todolist
 * @property {Array.<TodoEntity>} todos
 */




/**
 * Get a list of todos
 * @route GET /todo
 * @returns {Todolist.model} - 200 - OK
 * @group Todo
 */
todoRoutes.get('/', async (req, res, next) => {
	try {
		const todos = await todoService.fetchAll();
		res.json({ todos });
	} catch (e) {
		next(e);
	}
});

/**
 * Get a todo by id
 * @route GET /todo/{id}
 * @param {integer} id.path.required
 * @returns {TodoEntity.model} - 200 - OK
 * @group Todo
 */
todoRoutes.get('/:id', async (req, res, next) => {
	try {
		const todo = await todoService.fetchOneById(req.params.id);
		res.json(todo);
	} catch (e) {
		next(e);
	}
});

/**
 * Create a todo
 * @route POST /todo
 * @param {TodoInput.model} todo.body.required
 * @returns - 200 - OK
 * @group Todo
 */
todoRoutes.post('/', async (req, res, next) => {
	try {
		await todoService.createOne(req.body);
		res.end('OK');
	} catch (e) {
		next(e);
	}
});

/**
 * Update a todo
 * @route PUT /todo/{id}
 * @param {integer} id.path.required
 * @param {TodoInput.model} todo.body.required - Not all properties are required, only updating ones
 * @returns - 200 - OK
 * @group Todo
 */
todoRoutes.put('/:id', async (req, res, next) => {
	try {
		await todoService.updateOne(req.params.id, req.body);
		res.end('OK');
	} catch (e) {
		next(e);
	}
});

/**
 * Delete a todo
 * @route DELETE /todo/{id}
 * @param {integer} id.path.required
 * @returns - 200 - OK
 * @group Todo
 */
todoRoutes.delete('/:id', async (req, res, next) => {
	try {
		await todoService.deleteOne(req.params.id);
		res.end('OK');
	} catch (e) {
		next(e);
	}
});

module.exports = todoRoutes;