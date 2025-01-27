import db from '../config/db.config.js'
import { DataTypes } from 'sequelize'

const ProductConfiguration = db.define(
  'ProductConfiguration',
  {
    model: { type: DataTypes.STRING(50), allowNull: false },
    width: { type: DataTypes.STRING, allowNull: true },
    length: { type: DataTypes.STRING, allowNull: true },
    height: { type: DataTypes.INTEGER, allowNull: true },
    configurationType: { type: DataTypes.ENUM('Individual', 'Complejo'), allowNull: true },
    usageType: { type: DataTypes.STRING, allowNull: false },
    requiredAreas: { type: DataTypes.JSON, allowNull: true },
    numberOfPeople: { type: DataTypes.INTEGER, allowNull: false },
    airConditioning: { type: DataTypes.BOOLEAN, defaultValue: false },
    voiceAndData: { type: DataTypes.BOOLEAN, defaultValue: false },
    interiorFinish: { type: DataTypes.ENUM('Melamina', 'Glas Liner', 'Otro'), allowNull: true },
    accessories: { type: DataTypes.JSON, allowNull: true },
    referencePlan: { type: DataTypes.STRING, allowNull: true }
  },
  {
    tableName: 'product_configurations',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (quotation_item) => {},
      beforeUpdate: (quotation_item) => {}
    }
  }
)

export default ProductConfiguration
