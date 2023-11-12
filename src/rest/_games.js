const Router = require('@koa/router');
const gameService = require('../service/game');

const getAllGames = async (ctx) => {
	ctx.body = await gameService.getAll();
};

const createGame = async (ctx) => {
	const newGame = await gameService.create(ctx.request.body);
	ctx.body = newGame;
	ctx.status = 201;
};

const getGameById = async (ctx) => {
	ctx.body = await gameService.getById(Number(ctx.params.id));
};

const updateGame = async (ctx) => {
	ctx.body = await gameService.updateById(ctx.params.id, ctx.request.body);
};

const deleteGame = async (ctx) => {
	await gameService.deleteById(ctx.params.id);
	ctx.status = 204;
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
	const router = new Router({
		prefix: '/games',
	});

	router.get('/', getAllGames);
	router.post('/', createGame);
	router.get('/:id', getGameById);
	router.put('/:id', updateGame);
	router.delete('/:id', deleteGame);

	app.use(router.routes()).use(router.allowedMethods());
};
