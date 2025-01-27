import * as yup from 'yup'

const loginSchema = yup.object({
  email: yup
    .string()
    .email('El email no es válido')
    .max(255, 'El email no puede tener más de 255 caracteres')
    .required('El email es requerido'),

  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña debe tener como máximo 100 caracteres')
    .required('La contraseña es requerida')
})

export default loginSchema
