import { NegotiationType } from '../models/index.js'
import errorHandle from '../utils/error.js'

export default {
  getNegotiationTypes: async (req, res) => {
    try {
      const negotiationTypes = await NegotiationType.findAll()
      res.status(200).json({
        success: true,
        message: 'Departamentos obtenidos correctamente',
        data: negotiationTypes
      })
    } catch (error) {
      errorHandle(error, req, res)
    }
  }
}
