const Router = require('@koa/router');
const userService = require('../service/user');

const getAllUsers = async (ctx) => {
  ctx.body = await userService.findAllUsers();
};

const createUser = async (ctx) => {
  const newUser = await userService.createUser(ctx.request.body);
  ctx.body = newUser;
  ctx.status = 201;
};

const getUserById = async (ctx) => {
  ctx.body = await userService.findUserById(Number(ctx.params.id));
};

const updateUser = async (ctx) => {
  ctx.body = await userService.updateUserById(ctx.params.id, ctx.request.body);
};

const deleteUser = async (ctx) => {
  await userService.deleteUserById(ctx.params.id);
  ctx.status = 204;
};

const getUserGames = async (ctx) => {
  ctx.body = await userService.findGamesByUserId(Number(ctx.params.id));
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/users',
  });

  router.get('/', getAllUsers);
  router.post('/', createUser);
  router.get('/:id', getUserById);
  router.put('/:id', updateUser);
  router.delete('/:id', deleteUser);
  router.get('/:id/games', getUserGames);

  app.use(router.routes()).use(router.allowedMethods());
};
