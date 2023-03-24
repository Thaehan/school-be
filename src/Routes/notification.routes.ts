import express, { Express } from 'express'

import notificationController from '../Controllers/notification.controller'

const notificationRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', notificationController.createAsync)

  router.get('/:id', notificationController.getByIdAsync)

  router.get('/', notificationController.getManyAsync)

  router.post('/update', notificationController.updateByIdAsync)

  app.use('/api/notifications', router)
}

export default notificationRoutes
