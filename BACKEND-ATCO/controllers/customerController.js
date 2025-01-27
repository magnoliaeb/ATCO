import customerSchema from '../schemas/customerSchema.js'
import { Customer } from '../models/index.js'
import errorHandle from '../utils/error.js'

import { Op } from 'sequelize'

export default {
  createCustomer: async (req, res) => {
    const { error } = customerSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        error: 'VALIDATION_ERROR'
      })
    }

    try {
      const existCustomer = await Customer.findOne({ where: { email: req.body.email } })
      if (existCustomer) {
        return res.status(400).json({
          success: false,
          message: 'El cliente ya esta registrado',
          error: 'ALREADY_EXISTS'
        })
      }
      // // Crear el cliente
      const newCustomer = await Customer.create({
        ...req.body
      })

      res.status(201).json({
        success: true,
        message: 'El cliente ha sido creado correctamente',
        data: {
          id: newCustomer.id
        }
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  },
  editCustomer: async (req, res) => {
    const { id } = req.params
    const body = req.body

    const { error } = customerSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        error: 'VALIDATION_ERROR'
      })
    }

    try {
      const customer = await Customer.findOne({ where: { id } })

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'El cliente no existe',
          error: 'NOT_FOUND'
        })
      }

      if (body.email !== customer.email) {
        const existCustomer = await Customer.findOne({ where: { email: body.email } })
        if (existCustomer) {
          return res.status(400).json({
            success: false,
            message: 'El cliente ya está registrado',
            error: 'ALREADY_EXISTS'
          })
        }
      }

      await customer.update(body)

      res.status(200).json({
        success: true,
        message: 'El cliente ha sido actualizado correctamente',
        data: {
          customer
        }
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  },

  deleteCustomer: async (req, res) => {
    const { id } = req.params
    try {
      const customer = await Customer.findByPk(id)
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'El cliente no existe',
          error: 'NOT_FOUND'
        })
      }
      await customer.destroy()
      res.status(200).json({
        success: true,
        message: 'El cliente ha sido eliminado correctamente',
        data: {}
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  },
  getCustomerById: async (req, res) => {
    const { id } = req.params
    try {
      const customer = await Customer.findByPk(id)
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: 'El cliente no existe',
          error: 'NOT_FOUND'
        })
      }
      res.status(200).json({
        success: true,
        message: 'El cliente ha sido obtenido correctamente',
        data: customer
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  },
  getAllCustomers: async (req, res) => {
    try {
      const search = req.query.search || ''
      // Paginación
      const page = req.query.page || 1
      const perPage = 10
      const offset = (page - 1) * perPage

      // Filtrado
      const where = {}

      if (search) {
        where[Op.or] = [
          { name: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } }
        ]
      }

      const customers = await Customer.findAll({
        limit: perPage,
        offset,
        order: [['id', 'DESC']],
        where
      })

      const totalCustomers = await Customer.count({ where })
      const totalPages = Math.ceil(totalCustomers / perPage)

      const pagination = {
        currentPage: page,
        perPage,
        totalCustomers,
        totalPages
      }

      res.status(200).json({
        success: true,
        message: 'Los clientes han sido obtenidos correctamente',
        data: { customers, pagination }
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  }
}
