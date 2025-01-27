import Joi from 'joi'

const customerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre debe tener como máximo 50 caracteres',
    'any.required': 'El nombre es requerido'
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .max(255)
    .required('El correo electrónico es obligatorio')
    .messages({
      'string.email': 'El email no es válido',
      'any.required': 'El email es requerido'
    }),

  phone: Joi.string()
    .trim()
    .pattern(/^\+52\s\d{2,3}\s\d{4}\s\d{4}$/)
    .required()
    .messages({
      'string.pattern.base': 'El formato de teléfono no es válido (+52 00 0000 0000)',
      'any.required': 'El teléfono es requerido'
    }),

  address: Joi.string().max(255).required('La dirección es obligatoria')
})

export default customerSchema
