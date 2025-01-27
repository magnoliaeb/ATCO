import Joi from 'joi'

const loginSchema = Joi.object({
  email: Joi.string().email().max(255).required().messages({
    'string.email': 'El email no es válido',
    'any.required': 'El email es requerido'
  }),
  password: Joi.string().min(8).max(100).required().messages({
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'string.max': 'La contraseña debe tener como máximo 100 caracteres',
    'any.required': 'La contraseña es requerida'
  })
})

export default loginSchema
