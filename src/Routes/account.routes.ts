import express, { Express } from 'express'

import accountController from '../Controllers/account.controller'
import { auth } from '../Middlewares/auth'

const accountRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', accountController.createAsync)

  router.get('/', auth, accountController.getManyAsync)

  router.get('/:id', accountController.getByIdAsync)

  router.post('/update', accountController.updateAsync)

  app.use('/api/accounts', router)
}

export default accountRoutes
