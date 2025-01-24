import * as yup from 'yup'

const quotationSchema = yup.object().shape({
  client: yup
    .string()
    .required('El cliente es obligatorio')
    .email('Debe ser un correo electrónico válido'),
  asesor: yup
    .string()
    .required('El asesor es obligatorio')
    .email('Debe ser un correo electrónico válido'),
  proyectName: yup.string().required('El proyecto es obligatorio'),
  departament: yup.number().required('El departamento es obligatorio'),
  negotiationType: yup.number().required('El tipo de negociación es obligatorio'),
  fechaEntrega: yup
    .date()
    .min(new Date(), 'La fecha de entrega no puede ser en el pasado')
    .required('La fecha de entrega es obligatoria'),
  observaciones: yup.string().max(500, 'Las observaciones no pueden superar los 500 caracteres')
})

export default quotationSchema
