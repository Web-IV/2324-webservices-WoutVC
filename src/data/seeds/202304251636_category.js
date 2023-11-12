const { tables } = require("..");

module.exports = {
    seed: async (knex) => {
        await knex(tables.category).insert([
            {
                id: 1,
                name: "RPG",
            },
            {
                id: 2,
                name: "Adventure",
            },
            {
                id: 3,
                name: "Sandbox",
            },
            {
                id: 4,
                name: "Action",
            },
            {
                id: 5,
                name: "Sports",
            },
            {
                id: 6,
                name: "Shooter",
            },
            {
                id: 7,
                name: "Platformer",
            },
            {
                id: 8,
                name: "Party",
            },
        ]);
    },
};