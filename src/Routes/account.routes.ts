import express, { Express } from 'express'

import accountController from '../Controllers/account.controller'
import { auth } from '../Middlewares/auth'

const accountRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', accountController.createAsync)

  router.get('/', auth, accountController.getManyAsync)

  router.get('/:id', auth, accountController.getByIdAsync)

  router.delete('/:id', auth, accountController.deleteByIdAsync)

  router.post('/update', auth, accountController.updateAsync)

  app.use('/api/accounts', router)
}

export default accountRoutes
