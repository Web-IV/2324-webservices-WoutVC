const { tables, getKnex } = require('../data/index');
const { getLogger } = require('../core/logging');

/**
 * Find all users.
 */
const findAllUsers = () => {
  return getKnex()(tables.user)
    .select()
    .orderBy('username', 'ASC');
};

/**
 * Find a user with the given `username`.
 *
 * @param {string} username - Username to look for.
 */
const findUserByUsername = (username) => {
  return getKnex()(tables.user)
    .where('username', username)
    .first();
};

/**
 * Find a user with the given `id`.
 *
 * @param {number} id - Id of the user to find.
 */
const findUserById = (id) => {
  return getKnex()(tables.user)
    .where('id', id)
    .first();
};

/**
 * Calculate the total number of users.
 */
const findUserCount = async () => {
  const [count] = await getKnex()(tables.user)
    .count();
  return count['count(*)'];
};

/**
 * Retrieve all games associated with a user with details.
 *
 * @param {number} userId - Id of the user.
 */
const findGamesByUserId = async (id) => {
  const user = await findUserById(id);

  // If the user is found, fetch details for each game in the games array.
  if (user && user.games) {
    const gamesWithDetails = await Promise.all(user.games.map(async (gameId) => {
      const gameDetails = await getKnex()(tables.game)
        .where('id', gameId)
        .first();
      return gameDetails;
    }));

    return gamesWithDetails;
  } else {
    return [];
  }
};

/**
 * Create a new user with the given `username` and `games`.
 *
 * @param {object} user - User to create.
 * @param {string} user.username - Username of the user.
 * @param {array} user.games - Array of game IDs associated with the user.
 *
 * @returns {Promise<number>} Created user's id
 */
const createUser = async ({ username, games }) => {
  try {
    const [id] = await getKnex()(tables.user)
      .insert({
        username,
      });

    if (games && games.length > 0) {
      await getKnex()(tables.user_game)
        .insert(games.map((gameId) => ({ user_id: id, game_id: gameId })));
    }

    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in createUser', {
      error,
    });
    throw error;
  }
};

/**
 * Update an existing user with the given `username` and `games`.
 *
 * @param {number} id - Id of the user to update.
 * @param {object} user - User to update.
 * @param {string} user.username - Username of the user.
 * @param {array} user.games - Array of game IDs associated with the user.
 *
 * @returns {Promise<number>} User's id
 */
const updateUserById = async (id, { username, games }) => {
  try {
    await getKnex()(tables.user)
      .update({        
        username,
      })
      .where('id', id);

    if (games && games.length > 0) {
      await getKnex()(tables.user_game)
        .where('user_id', id)
        .del();

      await getKnex()(tables.user_game)
        .insert(games.map((gameId) => ({ user_id: id, game_id: gameId })));
    }

    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateUserById', {
      error,
    });
    throw error;
  }
};

/**
 * Delete a user.
 *
 * @param {number} id - Id of the user to delete.
 *
 * @returns {Promise<boolean>} Whether the user was deleted.
 */
const deleteUserById = async (id) => {
  try {
    await getKnex()(tables.user_game)
      .where('user_id', id)
      .del();

    const rowsAffected = await getKnex()(tables.user)
      .delete()
      .where('id', id);

    return rowsAffected > 0;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in deleteUserById', {
      error,
    });
    throw error;
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  findUserCount,
  findUserByUsername,
  findGamesByUserId,
  createUser,
  updateUserById,
  deleteUserById,
};
