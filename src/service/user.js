const { getLogger } = require('../core/logging');
const userRepository = require('../repository/user');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};

/**
 * Find all users.
 */
const findAllUsers = () => {
  return userRepository.findAllUsers();
};

/**
 * Find a user with the given `id`.
 *
 * @param {number} id - Id of the user to find.
 */
const findUserById = (id) => {
  return userRepository.findUserById(id);
};

/**
 * Find games associated with the user with the given `id`.
 *
 * @param {number} id - Id of the user to find games for.
 */
const findGamesByUserId = async (id) => {
  return userRepository.findGamesByUserId(id);
};

/**
 * Create a new user with the given `username` and `games`.
 *
 * @param {object} user - User to create.
 * @param {string} user.username - Username of the user.
 * @param {array} user.games - Array of games associated with the user.
 *
 * @returns {Promise<number>} Created user's id
 */
const createUser = async ({ username, games }) => {
  try {
    const id = await userRepository.createUser({ username, games });
    return id;
  } catch (error) {
    debugLog('Error in createUser', { error });
    throw error;
  }
};

/**
 * Update an existing user with the given `username` and `games`.
 *
 * @param {number} id - Id of the user to update.
 * @param {object} user - User to create.
 * @param {string} user.username - Username of the user.
 * @param {array} user.games - Updated array of games associated with the user.
 *
 * @returns {Promise<number>} User's id
 */
const updateUserById = async (id, { username, games }) => {
  try {
    await userRepository.updateUserById(id, { username, games });
    return id;
  } catch (error) {
    debugLog('Error in updateUserById', { error });
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
    const deleted = await userRepository.deleteUserById(id);
    return deleted;
  } catch (error) {
    debugLog('Error in deleteUserById', { error });
    throw error;
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  findGamesByUserId,
  createUser,
  updateUserById,
  deleteUserById,
};
