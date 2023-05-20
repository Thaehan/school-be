import express, { Express } from 'express'

import accountController from '../Controllers/account.controller'

const accountRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', accountController.createAsync)

  router.get('/', accountController.getManyAsync)

  router.get('/:id', accountController.getByIdAsync)

  router.delete('/:id', accountController.deleteByIdAsync)

  router.post('/update', accountController.updateAsync)

  app.use('/api/accounts', router)
}

export default accountRoutes
