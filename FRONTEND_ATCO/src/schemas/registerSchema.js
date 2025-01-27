import * as yup from 'yup'

const registerSchema = yup.object({
  name: yup
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre debe tener como máximo 50 caracteres')
    .required('El nombre es requerido'),

  email: yup
    .string()
    .email('El email no es válido')
    .max(255, 'El email no puede tener más de 255 caracteres')
    .required('El email es requerido'),

  password: yup
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña debe tener como máximo 100 caracteres')
    .required('La contraseña es requerida'),

  role: yup
    .string()
    .oneOf(['admin', 'ingeniero', 'vendedor'], 'El rol debe ser admin, ingeniero o vendedor')
    .required('El rol es requerido'),

  status: yup
    .boolean()
    .oneOf([true, false], 'El estado debe ser true o false')
    .required('El estado es requerido'),
  password: yup.string().required('La contraseña es obligatoria'),
  confirmPassword: yup
    .string()
    .required('La confirmación de contraseña es obligatoria')
    .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
})

export default registerSchema
