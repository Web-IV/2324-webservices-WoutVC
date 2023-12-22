const supertest = require('supertest');
const createServer = require('../../src/createServer');
const { tables, getKnex } = require('../data/index');

let server;
let request;
let knex;
  
  const data = {
	users: [
		{
		  id: 4,
		  username: 'TestUser',
		  games: JSON.stringify([1, 3, 5]),
		},
		{
		  id: 5,
		  username: 'AnotherUser',
		  games: JSON.stringify([2, 4, 6]),
		},
	  ],
	categories: [
	  {
		id: 9,
		name: 'Test',
	  },
	  {
		id: 10,
		name: 'Test2',
	  },
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
	user: [9, 10],
	};

  beforeAll(async () => {
	server = await createServer();
	request = supertest(server.getApp().callback());
	knex = getKnex();
  });
  
  afterAll(async () => {
	await server.stop();
  });
  
  const gameUrl = '/api/games';
  const categoryUrl = '/api/category';
  const userUrl = '/api/users';
  
  
  test('GET /api/games should return all games', async () => {
	await knex(tables.game).insert(data.games);
	await knex(tables.category).insert(data.categories);
  
	const response = await request.get(gameUrl);
  
	expect(response.status).toBe(200);
	expect(response.body.items.length).toBe(18);
  
	await knex(tables.game)
	  .whereIn('id', dataToDelete.games)
	  .delete();
  
	await knex(tables.category)
	  .whereIn('id', dataToDelete.categories)
	  .delete();
  
  });  

  test('PUT /api/games/:id should update an existing game', async () => {
	const existingGame = data.games[0];
	const updatedGame = {
	  name: 'UpdatedTestGame',
	  description: 'Updated test.',
	  prijs: 50,
	};
  
	await knex(tables.game).insert(existingGame);
  
	const response = await request.put(`${gameUrl}/${existingGame.id}`).send(updatedGame);
  
	expect(response.status).toBe(200);
	expect(response.body.id).toBe(existingGame.id);
	expect(response.body.name).toBe(updatedGame.name);
	expect(response.body.description).toBe(updatedGame.description);
	expect(response.body.prijs).toBe(updatedGame.prijs);
  
	await knex(tables.game).where('id', existingGame.id).delete();
  });


  test('GET /api/games/:id should return a single game by ID', async () => {
	const existingGame = data.games[0];
  
	await knex(tables.game).insert(existingGame);
  
	const response = await request.get(`${gameUrl}/${existingGame.id}`);
  
	expect(response.status).toBe(200);
	expect(response.body.id).toBe(existingGame.id);
  
	// Clean up: Delete the created game
	await knex(tables.game).where('id', existingGame.id).delete();
  });

  test('DELETE /api/games/:id should delete an existing game', async () => {
	const existingGame = data.games[0];
  
	await knex(tables.game).insert(existingGame);
  
	const response = await request.delete(`${gameUrl}/${existingGame.id}`);
  
	expect(response.status).toBe(204);
  
	// Verify that the game is deleted
	const deletedGame = await knex(tables.game).where('id', existingGame.id).first();
	expect(deletedGame).toBeUndefined();
  });

  test('GET /api/users should return all users', async () => {
	await knex(tables.user).insert(data.users);
  
	const response = await request.get(userUrl);
  
	expect(response.status).toBe(200);
	expect(response.body.length).toBe(5);
  
	await knex(tables.user).whereIn('id', data.users.map((user) => user.id)).del();
  });
  
  test('GET /api/users/:id should return a single user by ID', async () => {
	const existingUser = data.users[0];
  
	await knex(tables.user).insert(existingUser);
  
	const response = await request.get(`${userUrl}/${existingUser.id}`);
  
	expect(response.status).toBe(200);
	expect(response.body.id).toBe(existingUser.id);
  
	// Clean up: Delete the created user
	await knex(tables.user).where('id', existingUser.id).delete();
  }); 

  test('GET /api/category should return all categories', async () => {
	await knex(tables.category).insert(data.categories);
  
	const response = await request.get(categoryUrl);
  
	expect(response.status).toBe(200);
	expect(response.body.length).toBe(10);
  
	await knex(tables.category)
		.whereIn('id', dataToDelete.categories)
		.delete();
  });
  
  test('GET /api/category/:id should return a single category by ID', async () => {
	const existingCategory = data.categories[0];
  
	await knex(tables.category).insert(existingCategory);
  
	const response = await request.get(`${categoryUrl}/${existingCategory.id}`);
  
	expect(response.status).toBe(200);
	expect(response.body.id).toBe(existingCategory.id);
  
	// Clean up: Delete the created category
	await knex(tables.category).where('id', existingCategory.id).delete();
  });
  
  test('DELETE /api/category/:id should delete an existing category', async () => {
	const existingCategory = data.categories[0];
  
	await knex(tables.category).insert(existingCategory);
  
	const response = await request.delete(`${categoryUrl}/${existingCategory.id}`);
  
	expect(response.status).toBe(204);
  
	// Verify that the category is deleted
	const deletedCategory = await knex(tables.category).where('id', existingCategory.id).first();
	expect(deletedCategory).toBeUndefined();
  });