const supertest = require('supertest');
const createServer = require('../../src/createServer');
const { tables, getKnex } = require('../data/index');

let server;
let request;
let knex;
  
  const data = {
	categories: [
	  {
		id: 9,
		name: 'Test',
	  },
	  {
		id: 10,
		name: 'Test2',
	  },
	  // Add more categories as needed
	],
	games: [
		{
			id: 17,
			name: 'Kingdom Hearts',
			img: 'https://media.s-bol.com/vZ7pGz61A8xV/550x687.jpg',
			description: 'Een episch open wereld wild west spel met een meeslepend verhaal en realistische graphics.',
			console: 'PS4',
			category: 'RPG',
			categoryId: 1,
			prijs: 30,
		},
		{
			id: 18,
			name: 'Roblox',
			img: 'https://media.s-bol.com/j83kyWl5jWvz/nGR2VY/518x840.jpg',
			description: 'Een adembenemend open wereld spel vol avontuur en puzzels in het koninkrijk van Hyrule.',
			console: 'Switch',
			category: 'Adventure',
			categoryId: 2,
			prijs: 40,
		},
	],
  };

  const dataToDelete = {
	games: [17, 18],
	categories: [9, 10],
	};

  beforeAll(async () => {
	server = await createServer();
	request = supertest(server.getApp().callback());
	knex = getKnex();
  });
  
  afterAll(async () => {
	await server.stop();
  });
  
  const url = '/api/games';
  
  
  test('GET /api/games should return all games', async () => {
	await knex(tables.game).insert(data.games);
	await knex(tables.category).insert(data.categories);
  
	const response = await request.get(url);
  
	expect(response.status).toBe(200);
	expect(response.body.items.length).toBe(18);
  
	await knex(tables.game)
	  .whereIn('id', dataToDelete.games)
	  .delete();
  
	await knex(tables.category)
	  .whereIn('id', dataToDelete.categories)
	  .delete();
  
  });