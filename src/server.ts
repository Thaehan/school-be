import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import db from './Models'
import { setRoutes } from './Routes'

dotenv.config()
const app = express()
const port = process.env.PORT || 8080
const corsOptions = {
  origin: 'http://localhost:3000',
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log('Connected to database')
  })
  .catch((error) => {
    console.error(error)
  })

setRoutes(app)

app.listen(port, () => {
  console.log('listening on port ', port)
})
