import * as yup from 'yup'

const registerSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre debe tener como máximo 50 caracteres'),

  email: yup
    .string()
    .email('El email no es válido')
    .max(255, 'El email no puede tener más de 255 caracteres')
    .required('El correo electrónico es obligatorio'),

  phone: yup
    .string()
    .matches(
      /^\+52\s\d{2,3}\s\d{4}\s\d{4}$/,
      'El formato de teléfono no es válido (+52 00 0000 0000)'
    )
    .required('El teléfono es requerido'),

  address: yup
    .string()
    .max(255, 'La dirección no puede tener más de 255 caracteres')
    .required('La dirección es obligatoria')
})

export default registerSchema
