import * as yup from 'yup'

const registerSchema = yup.object({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres'),
  email: yup
    .string()
    .required('El correo electrónico es obligatorio')
    .email('Debe ser un correo electrónico válido'),
  password: yup.string().required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .required('La confirmación de contraseña es obligatoria')
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
})

export default registerSchema
