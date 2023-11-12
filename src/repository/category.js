const { tables, getKnex } = require("../data");
const { getLogger } = require("../core/logging");

const findAll = async () => {
    return await getKnex()(tables.category).select();
};

const findById = async (id) => {
    const category = await getKnex()(tables.category)
        .where(`${tables.category}.id`, id)
        .first();
    return category;
};

const createCategory = async ({ id, name }) => {
    try {
        await getKnex()(tables.category).insert({
            id,
            name,
        });

        return await findById(id);
    } catch (error) {
        const logger = getLogger();
        logger.error("Error in create", {
            error,
        });
        throw error;
    }
};

const deleteById = async (id) => {
    try {
        const rowsAffected = await getKnex()(tables.category)
            .delete()
            .where(`${tables.category}.id`, id);
        return rowsAffected > 0;
    } catch (error) {
        const logger = getLogger();
        logger.error("Error in deleteById", {
            error,
        });
        throw error;
    }
};

;

module.exports = {
    findAll,
    findById,
    createCategory,
    deleteById,
};
