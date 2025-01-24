import { userssSeed } from './usersSeed.js'
import { departamentsSeed } from './departamentSeed.js'
import { negotiationTypesSeed } from './negotiationTypesSeed.js'

const runSeeds = async () => {
  // Primero crear usuarios
  await userssSeed()

  // Luego crear departamentos
  await departamentsSeed()

  // Luego crear tipos de negociación
  await negotiationTypesSeed()

  // Finalmente, crear tareas
  console.log('Seeds ejecutados correctamente.')
}

export default runSeeds
