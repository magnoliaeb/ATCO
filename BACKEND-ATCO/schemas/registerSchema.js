import Joi from 'joi'

const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre debe tener como máximo 50 caracteres',
    'any.required': 'El nombre es requerido'
  }),
  email: Joi.string().email().max(255).required().messages({
    'string.email': 'El email no es válido',
    'any.required': 'El email es requerido'
  }),
  password: Joi.string().min(8).max(100).required().messages({
    'string.min': 'La contraseña debe tener al menos 8 caracteres',
    'string.max': 'La contraseña debe tener como máximo 100 caracteres',
    'any.required': 'La contraseña es requerida'
  }),
  role: Joi.string().valid('admin', 'ingeniero', 'vendedor').required().messages({
    'any.required': 'El rol es requerido',
    'any.only': 'El rol debe ser admin, ingeniero o vendedor'
  }),
  status: Joi.boolean().required().valid(true, false).messages({
    'any.required': 'El estado es requerido',
    'any.only': 'El estado debe ser true o false'
  })
})

export default registerSchema
