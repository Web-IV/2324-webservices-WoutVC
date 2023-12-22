const { tables } = require('..');

module.exports = {
  seed: async (knex) => {
    await knex(tables.user).insert([
      {
        id: 1,
        username: 'WoutVC',
        games: JSON.stringify([1, 3, 5, 7, 9]),
      },
      {
        id: 2,
        username: 'JohnDoe',
        games: JSON.stringify([2, 4, 6, 8, 10]),
      },
      {
        id: 3,
        username: 'Jeff',
        games: JSON.stringify([11, 13, 15]),
      },
    ]);
  },
};
