import express from 'express'
import swaggerUi from 'swagger-ui-express'
import mongoose from 'mongoose'
import router from './routes'
import { env } from './env'
import swaggerFile from './swagger.json'

export const app = express()

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

mongoose
  .connect(env.DATABASE_URL)
  .then((data) => {
    console.log('✅ Connection to MongoDB successful!')
  })
  .catch((err) => {
    console.log('❌ Connecting with MongoDB error => ', err.message)
  })

app.listen(env.PORT, () => {
  console.log(`🚀 Server running on port ${env.PORT}`)
})
