import { Departament } from '../models/index.js'
import errorHandle from '../utils/error.js'

export default {
  getDepartaments: async (req, res) => {
    try {
      const departaments = await Departament.findAll()
      res.status(200).json({
        success: true,
        message: 'Departamentos obtenidos correctamente',
        data: departaments
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  }
}
