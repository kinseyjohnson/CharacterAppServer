const DataTypes = require('sequelize');
const db = require('../db');

const Character = db.define('Character', {
  characterName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  playerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  class: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  race: {
    type: DataTypes.STRING,
    allowNull: false
  },
  background: {
    type: DataTypes.STRING,
    allowNull: false
  },
  alignment: {
    type: DataTypes.STRING,
    allowNull: false
  },
  strength: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dexterity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  constitution: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  intelligence: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  wisdom: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  charisma: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
})

module.exports = Character;