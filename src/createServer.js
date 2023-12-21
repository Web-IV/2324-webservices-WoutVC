const Koa = require('koa');
const config = require('config');
const koaCors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const { initializeLogger, getLogger } = require('./core/logging');
const { initializeData, shutdownData } = require('./data');
const installRest = require('./rest');
const serve = require('koa-static');
const path = require('path');

const NODE_ENV = config.get('env');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');

module.exports = async function createServer() {
  // Initialize logger with configuration
  initializeLogger({
    level: LOG_LEVEL,
    disabled: LOG_DISABLED,
    defaultMeta: { NODE_ENV },
  });

  // Initialize data (assuming it's a database or some other data source)
  await initializeData();

  // Create a Koa app and an Express app
  const app = new Koa();

  // Add CORS middleware in Koa
  app.use(
    koaCors({
      origin: (ctx) => {
        if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
          return ctx.request.header.origin;
        }
        return CORS_ORIGINS[0];
      },
      allowHeaders: ['Accept', 'Content-Type', 'Authorization'],
      maxAge: CORS_MAX_AGE,
    })
  );

  // Get the logger instance
  const logger = getLogger();

  // Body parser middleware in Koa
  app.use(bodyParser());

  // Serve Swagger definition JSON (assuming you have a route that serves the JSON)
  app.use(serve(path.join(__dirname, 'public'))); // Assuming your Swagger JSON is in the 'public' directory

  // Install REST routes in Koa
  installRest(app);

  // Return an object with functions to get the app, start, and stop the server
  return {
    getApp() {
      return app;
    },

    start() {
      return new Promise((resolve) => {
        // Start Koa server on port 9000
        app.listen(9000);
        logger.info('🚀 Koa Server listening on http://localhost:9000');

        resolve();
      });
    },

    async stop() {
      // Remove all event listeners, shut down data source, and log a message
      app.removeAllListeners();
      await shutdownData();
      logger.info('Goodbye');
    },
  };
};
