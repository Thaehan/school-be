import express, { Express } from 'express'

import accountController from '../Controllers/account.controller'

const accountRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', accountController.createAsync)

  router.get('/', accountController.getManyAsync)

  router.get('/login', accountController.loginAsync)

  router.get('/:id', accountController.getByIdAsync)

  router.post('/update', accountController.updateAsync)

  app.use('/api/accounts', router)
}

export default accountRoutes
