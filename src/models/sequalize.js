const { Sequelize } = require('sequelize');
const config = require('config');

const dbConfig = config.get('database');

const sequelize = new Sequelize({
  dialect: 'mysql2',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.name,
});

module.exports = sequelize;