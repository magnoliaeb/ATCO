import { NegotiationType } from '../models/index.js'

export const negotiationTypesSeed = async () => {
  try {
    const types = [{ name: 'Venta' }, { name: 'Renta' }, { name: 'Licitación' }, { name: 'Otro' }]

    // Inserta los datos en la tabla
    await NegotiationType.bulkCreate(types)
    console.log('Tipos de negociación insertados correctamente.')
  } catch (error) {
    console.error('Error insertando los tipos de negociación:', error)
  }
}
