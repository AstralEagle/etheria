import {DataTypes, Model} from 'sequelize';

import db from '../index.js';
import User from './User.js';

class Legend extends Model {}

Legend.init({
  player: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxLife: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  life: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  maxMove: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  move: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  initiative: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },


}, {
  sequelize: db,
  modelName: 'legend',
});

export default Legend;
