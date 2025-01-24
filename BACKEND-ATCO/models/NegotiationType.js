import db from '../config/db.config.js'
import { DataTypes } from 'sequelize'

const NegotiationType = db.define(
  'NegotiationType',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    tableName: 'negotiation_types',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (type) => {},
      beforeUpdate: (type) => {}
    }
  }
)

export default NegotiationType
