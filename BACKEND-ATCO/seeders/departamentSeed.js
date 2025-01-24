import { Departament } from '../models/index.js'

export const departamentsSeed = async () => {
  try {
    const departaments = [
      { name: 'Ventas' },
      { name: 'Compras' },
      { name: 'Producción' },
      { name: 'Logística' },
      { name: 'Recursos Humanos' }
    ]

    // Inserta los datos en la tabla
    await Departament.bulkCreate(departaments)
    console.log('Departamentos insertados correctamente.')
  } catch (error) {
    console.error('Error insertando los departamentos:', error)
  }
}
