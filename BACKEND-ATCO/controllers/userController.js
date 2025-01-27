import bcrypt from 'bcrypt'

import registerSchema from '../schemas/registerSchema.js'
import loginSchema from '../schemas/loginSchema.js'

import { User } from '../models/index.js'
import errorHandle from '../utils/error.js'

import { tokenSign } from '../utils/token.js'
import { Op } from 'sequelize'

export default {
  createUser: async (req, res) => {
    const { error } = registerSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        error: 'VALIDATION_ERROR'
      })
    }

    try {
      // verificar que el usuario no este registrado
      const existUser = await User.findOne({ where: { email: req.body.email } })

      if (existUser) {
        return res.status(400).json({
          success: false,
          message: 'El usuario ya esta registrado',
          error: 'ALREADY_EXISTS'
        })
      }
      // // Cifrar la contraseña
      const salt = bcrypt.genSaltSync(10)
      const hashPassword = bcrypt.hashSync(req.body.password, salt)

      // // Crear el usuario
      const newUser = await User.create({
        ...req.body,
        password: hashPassword
      })

      res.status(201).json({
        success: true,
        message: 'Usuario creado correctamente',
        data: {
          id: newUser.id
        }
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  },
  editUser: async (req, res) => {
    const { id } = req.params
    const body = req.body

    try {
      const user = await User.findOne({ where: { id } })

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'El usuario no existe',
          error: 'NOT_FOUND'
        })
      }

      if (body.email !== user.email) {
        const existUser = await User.findOne({ where: { email: body.email } })
        if (existUser) {
          return res.status(400).json({
            success: false,
            message: 'El usuario ya está registrado',
            error: 'ALREADY_EXISTS'
          })
        }
      }

      // Verificar si la contraseña fue enviada y es diferente a la actual
      if (body.password) {
        const passwordMatch = await bcrypt.compare(body.password, user.password)

        if (!passwordMatch) {
          console.log('La contraseña ha sido cambiada')

          const salt = bcrypt.genSaltSync(10)
          const hashPassword = bcrypt.hashSync(body.password, salt)

          body.password = hashPassword
        } else {
          console.log('La contraseña NO ha cambiado')
          delete body.password // Para evitar re-hasheo innecesario
        }
      }

      // Actualizar usuario
      await user.update(body)

      res.status(200).json({
        success: true,
        message: 'El usuario ha sido actualizado correctamente',
        data: {
          user
        }
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  },
  updateStatus: async (req, res) => {
    const { id } = req.params
    try {
      const user = await User.findByPk(id)

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'El usuario no existe',
          error: 'NOT_FOUND'
        })
      }
      console.log(user)
      console.log('estado')

      if (user.status) {
        user.status = false
      } else {
        user.status = true
      }

      await user.save()

      res.status(200).json({
        success: true,
        message: 'El estado del usuario ha sido actualizado correctamente',
        data: {
          status: user.status
        }
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params
    try {
      const user = await User.findByPk(id)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'El usuario no existe',
          error: 'NOT_FOUND'
        })
      }
      await user.destroy()
      res.status(200).json({
        success: true,
        message: 'El usuario ha sido eliminado correctamente',
        data: {}
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params
    try {
      const user = await User.findByPk(id)
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'El usuario no existe',
          error: 'NOT_FOUND'
        })
      }
      res.status(200).json({
        success: true,
        message: 'El usuario ha sido obtenido correctamente',
        data: user
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  },
  getUsers: async (req, res) => {
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

      const users = await User.findAll({
        attributes: { exclude: ['password', 'token'] },
        limit: perPage,
        offset,
        order: [['id', 'DESC']],
        where
      })

      const totalUsers = await User.count({ where })
      const totalPages = Math.ceil(totalUsers / perPage)

      const pagination = {
        currentPage: page,
        perPage,
        totalUsers,
        totalPages
      }

      res.status(200).json({
        success: true,
        message: 'Usuarios obtenidos correctamente',
        data: { users, pagination }
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  }
}
