
import express, { Express } from 'express'

import authController from '../Controllers/auth.controller'

const authRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', authController.loginAsync)

  app.use('/api/auth', router)
}

export default authRoutes
