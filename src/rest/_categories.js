    const Router = require("@koa/router");
    const categoryService = require("../service/category");
    const Joi = require("joi");
    const validate = require("./_validation");

    const getAllCategory = async (ctx) => {
        ctx.body = await categoryService.getAll();
    };

    const createCategory = async (ctx) => {
        const newCategory = await categoryService.create(ctx.request.body);
        ctx.body = newCategory;
        ctx.status = 201;
    };

    const getCategoryById = async (ctx) => {
        ctx.body = await categoryService.getById(Number(ctx.params.id));
    };
    getCategoryById.validationScheme = {
        params: Joi.object({
            id: Joi.number().min(0).required(),
        }),
    };

    const updateCategory = async (ctx) => {
        ctx.body = await categoryService.updateById(ctx.params.id, ctx.request.body);
    };
    updateCategory.validationScheme = {
        params: Joi.object({
            id: Joi.number().min(0).required(),
        }),
    };

    const deleteCategory = async (ctx) => {
        await categoryService.deleteById(ctx.params.id);
        ctx.status = 204;
    };
    deleteCategory.validationScheme = {
        params: Joi.object({
            id: Joi.number().min(0).required(),
        }),
    };

    module.exports = (app) => {
        const router = new Router({
            prefix: '/category',
        });


        router.get('/', getAllCategory);
        router.post(
            '/',
            validate(createCategory.validationScheme),
            createCategory
        );
        router.get('/:id', validate(getCategoryById.validationScheme), getCategoryById);
        router.put(
            '/:id',
            validate(updateCategory.validationScheme),
            updateCategory
        );
        router.delete(
            '/:id',
            validate(deleteCategory.validationScheme),
            deleteCategory
        );

        app.use(router.routes()).use(router.allowedMethods());
    };