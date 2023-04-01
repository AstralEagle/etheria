import {DataTypes, Model} from 'sequelize';

import db from '../index.js';

class User extends Model {}

User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rank: {
    type: DataTypes.NUMBER,
    defaultValue: 1000,
  },
}, {
  sequelize: db,
  modelName: 'user',
  timestamps: true,
  updatedAt: false,
});

export default User;
