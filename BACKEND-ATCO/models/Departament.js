import db from '../config/db.config.js'
import { DataTypes } from 'sequelize'

const Departament = db.define(
  'Departament',
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
    tableName: 'departaments',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (departament) => {},
      beforeUpdate: (departament) => {}
    }
  }
)

export default Departament
