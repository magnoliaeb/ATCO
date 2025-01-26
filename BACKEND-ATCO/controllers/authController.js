import bcrypt from 'bcrypt'

import registerSchema from '../schemas/registerSchema.js'
import loginSchema from '../schemas/loginSchema.js'

import { User } from '../models/index.js'
import errorHandle from '../utils/error.js'

import { tokenSign } from '../utils/token.js'

export default {
  login: async (req, res) => {
    const { error } = loginSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
        error: 'VALIDATION_ERROR'
      })
    }

    const { email, password } = req.body

    try {
      // Verificar si el usuario existe
      const user = await User.findOne({
        where: { email: email.toLowerCase().trim() }
      })

      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'El usuario no existe',
          error: 'USER_NOT_FOUND'
        })
      }

      // Verificar la contraseña
      const matchPassword = await bcrypt.compare(password, user.password)
      if (!matchPassword) {
        return res.status(400).json({
          success: false,
          message: 'La contraseña es incorrecta',
          error: 'INVALID_PASSWORD'
        })
      }

      // verificar si el usuario esta confirmado
      if (!user.status) {
        return res.status(400).json({
          success: false,
          message: 'El usuario esta desactivado',
          error: 'USER_NOT_ACTIVE'
        })
      }

      // Generar el token
      const token = await tokenSign(user)

      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Lax',
          maxAge: 1000 * 60 * 60 * 2
        })
        .status(200)
        .json({
          success: true,
          message: 'Usuario autenticado correctamente',
          data: {
            token
          }
        })
    } catch (error) {
      errorHandle(error, req, res)
    }
  },
  myProfile: async (req, res) => {
    const { id } = req.user
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['password', 'token'] }
    })
    // console.log(user)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'El usuario no existe',
        error: 'USER_NOT_FOUND'
      })
    }
    res.status(200).json({
      success: true,
      message: 'Perfil obtenido correctamente',
      data: user
    })
  },
  logout: async (req, res) => {
    res.clearCookie('access_token')
    res.status(200).json({
      success: true,
      message: 'Sesión cerrada correctamente',
      data: {}
    })
  }
}
