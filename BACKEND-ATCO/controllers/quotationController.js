// import customerSchema from '../schemas/customerSchema.js'
import { Quotation } from '../models/index.js'
import errorHandle from '../utils/error.js'

import { Op } from 'sequelize'

export default {
  getQuotations: async (req, res) => {
    try {
      const search = req.query.search || ''
      // Paginación
      const page = req.query.page || 1
      const perPage = 10
      const offset = (page - 1) * perPage

      // Filtrado
      const where = {}

      // if (search) {
      //   where[Op.or] = [
      //     { name: { [Op.iLike]: `%${search}%` } },
      //     { email: { [Op.iLike]: `%${search}%` } }
      //   ]
      // }

      const quotations = await Quotation.findAll({
        limit: perPage,
        offset,
        order: [['id', 'DESC']],
        where
      })

      const totalQuotations = await Quotation.count({ where })
      const totalPages = Math.ceil(totalQuotations / perPage)

      const pagination = {
        currentPage: page,
        perPage,
        totalQuotations,
        totalPages
      }

      res.status(200).json({
        success: true,
        message: 'Las cotizaciones han sido obtenidos correctamente',
        data: { quotations, pagination }
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  }
}
