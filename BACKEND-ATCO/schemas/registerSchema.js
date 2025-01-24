import Joi from 'joi'

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required().max(255),
  password: Joi.string().required().min(8),
  role: Joi.string().required(),
  status: Joi.boolean().required()
})

export default registerSchema
