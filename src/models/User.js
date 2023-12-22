const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  games: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: 'user',
  timestamps: true,
});

module.exports = User;
