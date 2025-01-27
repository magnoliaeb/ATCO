import { userssSeed } from './usersSeed.js'
import { departamentsSeed } from './departamentSeed.js'
import { negotiationTypesSeed } from './negotiationTypesSeed.js'
import { customersSeed } from './customersSeed.js'

const runSeeds = async () => {
  // Primero crear usuarios
  await userssSeed()

  // Luego crear departamentos
  await departamentsSeed()

  // Luego crear tipos de negociación
  await negotiationTypesSeed()

  // Luego crear clientes
  await customersSeed()

  // Finalmente, crear tareas
  console.log('Seeds ejecutados correctamente.')
}

export default runSeeds
