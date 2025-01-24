import bcrypt from 'bcrypt'

import registerSchema from '../schemas/registerSchema.js'
import loginSchema from '../schemas/loginSchema.js'

import { User } from '../models/index.js'
import errorHandle from '../utils/error.js'

import { tokenSign } from '../utils/token.js'

export default {
  createUser: async (req, res) => {
    try {
      const { error } = registerSchema.validate(req.body)

      if (error) {
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
          error: 'VALIDATION_ERROR'
        })
      }

      console.log(req.body.email)
      // verificar que el usuario no este registrado
      const existUser = await User.findOne({ where: { email: req.body.email } })

      if (existUser) {
        return res.status(400).json({
          success: false,
          message: 'El usuario ya esta registrado',
          error: 'USER_ALREADY_EXISTS'
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
          error: 'USER_NOT_FOUND'
        })
      }

      if (body.email && body.email !== user.email) {
        const existUser = await User.findOne({ where: { email: body.email } })
        if (existUser) {
          return res.status(400).json({
            success: false,
            message: 'El usuario ya está registrado',
            error: 'USER_ALREADY_EXISTS'
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
    const { id } = req.user
    const { status } = req.body
    try {
      const user = await User.findByPk(id)

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'El usuario no existe',
          error: 'USER_NOT_FOUND'
        })
      }

      user.status = status
      await user.save()

      res.status(200).json({
        success: true,
        message: 'El estado del usuario ha sido actualizado correctamente',
        data: {}
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
          error: 'USER_NOT_FOUND'
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
          error: 'USER_NOT_FOUND'
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
      const users = await User.findAll()
      res.status(200).json({
        success: true,
        message: 'Usuarios obtenidos correctamente',
        data: users
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  }
}
