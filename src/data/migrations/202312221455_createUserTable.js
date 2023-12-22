const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.user, (table) => {
      table.increments('id');
      
      table.string('username', 255)
        .notNullable()
        .unique();

      table.text('games');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.user);
  },
};
