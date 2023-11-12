const { DataTypes } = require('sequelize');
const sequelize = require('./sequalize');

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  console: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prijs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'game',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['name'],
      name: 'idx_game_name_unique',
    },
  ],
});

module.exports = Game;