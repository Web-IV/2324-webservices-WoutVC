const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

/**
 * Find all games.
 */
const findAll = () => {
  return getKnex()(tables.game)
    .select()
    .orderBy('name', 'ASC');
};

/**
 * Find a game with the given `name`.
 *
 * @param {string} name - Name to look for.
 */
const findByName = (name) => {
  return getKnex()(tables.game)
    .where('name', name)
    .first();
};

/**
 * Find a game with the given `id`.
 *
 * @param {number} id - Id of the place to find.
 */
const findById = (id) => {
  return getKnex()(tables.game)
    .where('id', id)
    .first();
};

/**
 * Calculate the total number of places.
 */
const findCount = async () => {
  const [count] = await getKnex()(tables.game)
    .count();
  return count['count(*)'];
};

/**
 * Create a new game with the given `name` and `rating`.
 *
 * @param {object} game - Game to create.
 * @param {string} game.name - Name of the place.
 * @param {string} game.img - url of the image of the game.
 * @param {string} game.description - the description of the game.
 * @param {string} game.console - the console you can play the game on.
 * @param {string} game.category - the category of the game.
 * @param {string} game.categoryId - the id of the category.
 * @param {integer} game.prijs - the price of the game.
 *
 * @returns {Promise<number>} Created place's id
 */
const create = async ({
  name,
  img,
  description,
  console,
  category,
  categoryId,
  prijs,
}) => {
  try {
    const [id] = await getKnex()(tables.game)
      .insert({
        name,
        img,
        description,
        console,
        category,
        categoryId,
        prijs,
      });

    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
};

/**
 * Update an existing place with the given `name` and `rating`.
 *
 * @param {number} id - Id of the place to update.
 * @param {object} game - Game to create.
 * @param {string} game.name - Name of the place.
 * @param {string} game.img - url of the image of the game.
 * @param {string} game.description - the description of the game.
 * @param {string} game.console - the console you can play the game on.
 * @param {string} game.category - the category of the game.
 * @param {string} game.categoryId - the id of the category.
 * @param {integer} game.prijs - the price of the game.
 *
 * @returns {Promise<number>} Game's id
 */
const updateById = async (id, {
  name,
  img,
  description,
  console,
  category,
  categoryId,
  prijs,
}) => {
  try {
    await getKnex()(tables.game)
      .update({        
        name,
        img,
        description,
        console,
        category,
        categoryId,
        prijs,
      })
      .where('id', id);

    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};

/**
 * Delete a place.
 *
 * @param {number} id - Id of the game to delete.
 *
 * @returns {Promise<boolean>} Whether the game was deleted.
 */
const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.game)
      .delete()
      .where('id', id);

    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in deleteById', {
      error,
    });
    throw error;
  }
};

module.exports = {
  findAll,
  findById,
  findCount,
  findByName,
  create,
  updateById,
  deleteById,
};
