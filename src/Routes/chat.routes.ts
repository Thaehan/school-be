import express, { Express } from 'express'

import accountController from '../Controllers/account.controller'

const chatRoutes = (app: Express) => {
  const router = express.Router()

  router.get('/:id', accountController.getByIdAsync)

  app.use('/api/chat', router)
}

export default chatRoutes
