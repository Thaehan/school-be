import express, { Express } from 'express'

import classController from '../Controllers/class.controller'

const classRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', classController.createAsync)

  router.get('/:id', classController.getByIdAsync)

  router.get('/', classController.getManyAsync)

  router.post('/update', classController.updateByIdAsync)

  app.use('/api/classes', router)
}

export default classRoutes
