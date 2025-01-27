import db from '../config/db.config.js'
import { DataTypes } from 'sequelize'

const QuotationItem = db.define(
  'QuotationItem',
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  {
    tableName: 'quotation_items',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (quotation_item) => {},
      beforeUpdate: (quotation_item) => {}
    }
  }
)

export default QuotationItem
