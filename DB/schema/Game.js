import {DataTypes, Model} from 'sequelize';
import User from './User.js';

import db from '../index.js';
import Legend from './Legend.js';

class Game extends Model {}

Game.init({
  player1: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  player2: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    }},
  legend1: {
    type: DataTypes.INTEGER,
    references: {
      model: Legend,
      key: 'id',
    },
  },
  legend2: {
    type: DataTypes.INTEGER,
    references: {
      model: Legend,
      key: 'id',
    },
  },
  legend3: {
    type: DataTypes.INTEGER,
    references: {
      model: Legend,
      key: 'id',
    },
  },
  legend4: {
    type: DataTypes.INTEGER,
    references: {
      model: Legend,
      key: 'id',
    },
  },
  legend5: {
    type: DataTypes.INTEGER,
    references: {
      model: Legend,
      key: 'id',
    },
  },
  legend6: {
    type: DataTypes.INTEGER,
    references: {
      model: Legend,
      key: 'id',
    },
  },
  round: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
  },
  turn: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
  },
  legendTurns: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
  },
  legendTurn: {
    type: DataTypes.NUMBER,
    defaultValue: 0,
  },
  selectChamp: {
    type: DataTypes.NUMBER,
    defaultValue: 1,
  },
}, {
  sequelize: db,
  modelName: 'game',
});

export default Game;
