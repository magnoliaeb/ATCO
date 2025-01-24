import * as yup from 'yup'

const loginSchema = yup.object({
  email: yup.string().email('Debe ser un email válido').required('El email es obligatorio'),
  password: yup.string().required('La contraseña es obligatoria')
})

export default loginSchema
