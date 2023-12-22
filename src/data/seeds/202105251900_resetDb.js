const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    // first delete all entries in every table
    await knex(tables.game).delete();
    await knex(tables.category).delete();
    await knex(tables.user).delete();
  },
};
