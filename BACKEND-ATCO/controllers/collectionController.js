import { Collection } from '../models/index.js';
import errorHandle from "../utils/error.js";


export default {
    getAllCollections: async (req, res) => {
        try {
            const collections = await Collection.findAll();
            res.json({
                success: true,
                message: 'Colecciones obtenidas correctamente',
                data: collections
            });

        } catch (error) {
            errorHandle(error, req, res)

        }

    },

}