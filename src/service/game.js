const { getLogger } = require('../core/logging');
const gameRepository = require('../repository/game');

const debugLog = (message, meta = {}) => {
	if (!this.logger) this.logger = getLogger();
	this.logger.debug(message, meta);
};

/**
 * Get all games.
 */
const getAll = async () => {
	debugLog('Fetching all games');
	const items = await gameRepository.findAll();
	const count = await gameRepository.findCount();
	return { items, count };
};

/**
 * Get the game with the given `id`.
 *
 * @param {string} id - Id of the game to get.
 */
const getById = (id) => {
	debugLog(`Fetching game with id ${id}`);
	return gameRepository.findById(id);
};

/**
 * Create a new game.
 *
 * @param {object} game - Game to create.
 * @param {string} game.name - Name of the game.
 * @param {string} game.img - url of the image of the game.
 * @param {string} game.description - the description of the game.
 * @param {string} game.console - the console you can play the game on.
 * @param {string} game.category - the category of the game.
 * @param {string} game.categoryId - the id of the category.
 * @param {string} game.prijs - the price of the game.
 */
const create = async ({ name, img, description, console, category, categoryId, prijs }) => {
	const newGame = { name, img, description, console, category, categoryId, prijs};
	debugLog('Creating new game', newGame);
	const id = await gameRepository.create(newGame);
	return getById(id);
};

/**
 * Update an existing game.
 *
 * @param {string} id - Id of the game to update.
 * @param {object} game - Game to save.
 * @param {string} game.name - Name of the game.
 * @param {string} game.img - url of the image of the game.
 * @param {string} game.description - the description of the game.
 * @param {string} game.console - the console you can play the game on.
 * @param {string} game.category - the category of the game.
 * @param {string} game.categoryId - the id of the category.
 * @param {integer} game.prijs - the price of the game.
 */
const updateById = async (id, { name, img, description, console, category, categoryId, prijs }) => {
	const updatedGame = { name, img, description, console, category, categoryId, prijs };
	debugLog(`Updating game with id ${id}`, updatedGame);
	await gameRepository.updateById(id, updatedGame);
	return getById(id);
};

/**
 * Delete an existing game.
 *
 * @param {string} id - Id of the game to delete.
 */
const deleteById = async (id) => {
	debugLog(`Deleting game with id ${id}`);
	await gameRepository.deleteById(id);
};

module.exports = {
	getAll,
	getById,
	create,
	updateById,
	deleteById,
};
