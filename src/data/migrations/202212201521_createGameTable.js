const { tables } = require('..');

module.exports = {
  up: async (knex) => {
    await knex.schema.createTable(tables.game, (table) => {
      table.increments('id');

      table.string('name', 255)
        .notNullable();
      
      table.string('img', 255)
        .notNullable();
      
      table.string('description', 255)
        .notNullable();
      
      table.string('console', 255)
        .notNullable();

      table.string('category', 255)
        .notNullable();
      
      table.integer('categoryId')
        .notNullable();
        
      table.integer('prijs')
        .notNullable();

      table.unique('name', 'idx_game_name_unique');
    });
  },
  down: (knex) => {
    return knex.schema.dropTableIfExists(tables.game);
  },
};
