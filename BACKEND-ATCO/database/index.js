import db from '../config/db.config.js'
import colors from 'colors'
import runSeeds from '../seeders/index.js'

const connect = async () => {
  const force = false
  try {
    await db.authenticate()
    await db.sync({ force })
    if (force) {
      // correr seeders
      runSeeds()
    }
    console.log(colors.bgCyan('Base de datos conectada'))
  } catch (error) {
    console.log(colors.bgRed(error))
    db.close()
  }
}

export default connect
