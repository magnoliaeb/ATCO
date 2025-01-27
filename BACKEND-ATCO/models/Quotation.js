import db from '../config/db.config.js'
import { DataTypes } from 'sequelize'

const Quotation = db.define(
  'Quotation',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departament_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    negotiationType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'venta'
    },
    proyectName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    placeInstallation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // total: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'cotizado'
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    aprroved_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    // si el tipo de negocio es licitación, se agrega la fecha de cierre de la licitación y el adjudicatario
    closed_licitation_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    adjudicator_licitation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    observations: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'quotations',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCreate: (quotation) => {}
    }
  }
)

export default Quotation
