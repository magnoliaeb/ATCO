import db from '../config/db.config.js'
import { DataTypes } from 'sequelize'

const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name_avatar_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (user) => {
        user.email = user.email.toLowerCase().trim()
        user.name_avatar_url = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}&background=random`
      },
      beforeUpdate: (user) => {
        user.email = user.email.toLowerCase().trim()
        user.name_avatar_url = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}&background=random`
      }
    }
  }
)

export default User
