import express from 'express'
import mongoose from 'mongoose'
import router from './routes'
import { env } from './env'

const app = express()

app.use(express.json())
app.use(router)

mongoose
  .connect(env.DATABASE_URL)

  .then((data) => {
    console.log('✅ Connection to MongoDB successful!')
  })
  .catch((err) => {
    console.log('❌ Connecting with MongoDB error => ', err.message)
  })

app.listen({
  port: env.PORT,
})
