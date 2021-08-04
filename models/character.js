const DataTypes = require('sequelize');
const db = require('../db');


const Character = db.define('character', {

  characterName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  playerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  characterClass: {
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
  },
  owner: {
    type: DataTypes.STRING
  }

});

module.exports = Character;