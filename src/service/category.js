const { getLogger } = require('../core/logging');
const categoryRepository = require('../repository/category');

const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
};

/**
 * Get all category.
 */
const getAll = async () => {
    debugLog('Fetching all category');
    const items = await categoryRepository.findAll();
    return items;    
};

/**
 * Get the category with the given `id`.
 *
 * @param {string} id - Id of the category to get.
 */
const getById = (id) => {
    debugLog(`Fetching category with id ${id}`);
    return categoryRepository.findById(id);
};

/**
 * Create a new category.
 *
 * @param {object} category - category to create.
 * @param {string} category.name - Name of the category.
 */
const create = async ({ name }) => {
    const newCategory = { name };
    debugLog('Creating new category', newCategory);
    const id = await categoryRepository.create(newCategory);
    return getById(id);
};

/**
 * Update an existing category.
 *
 @param {object} category - category to create.
 * @param {string} category.name - Name of the category.
 */
const updateById = async (id, { name }) => {
    const updatedCategory = { name };
    debugLog(`Updating category with id ${id}`, updatedCategory);
    await categoryRepository.updateById(id, updatedCategory);
    return getById(id);
};

/**
 * Delete an existing category.
 *
 * @param {string} id - Id of the category to delete.
 */
const deleteById = async (id) => {
    debugLog(`Deleting category with id ${id}`);
    await categoryRepository.deleteById(id);
};

/*
const getAll = async () => {
    debugLog('Fetching all categories');
    return Category.findAll();
};

const getById = async (id) => {
    debugLog(`Fetching category with id ${id}`);
    return Category.findByPk(id);
};

const create = async ({ name }) => {
    debugLog('Creating new category', { name });
    return Category.create({ name });
};

const updateById = async (id, { name }) => {
    debugLog(`Updating category with id ${id}`, { name });
    const category = await Category.findByPk(id);
    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }
    return category.update({ name });
};

const deleteById = async (id) => {
    debugLog(`Deleting category with id ${id}`);
    const category = await Category.findByPk(id);
    if (!category) {
        throw new Error(`Category with id ${id} not found`);
    }
    return category.destroy();
};
*/

module.exports = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
