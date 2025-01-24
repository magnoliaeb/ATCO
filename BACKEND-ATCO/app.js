import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import departamentRoute from './routes/departamentRoute.js'
import negotiationTypeRoute from './routes/negotiationTypeRoutes.js'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(morgan('dev'))

// habilitar json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

// Declarar rutas
app.get('/api', (req, res) => {
  res.json({
    author: 'magnoliaebv16',
    version: '1.0.0',
    message: 'Bienvenido a la API'
  })
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/departaments', departamentRoute)
app.use('/api/negotiation-types', negotiationTypeRoute)

export default app
