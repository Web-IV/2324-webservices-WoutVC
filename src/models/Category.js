const { DataTypes } = require('sequelize');
const sequelize = require('./sequalize');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'category',
  timestamps: false,
});

module.exports = Category;