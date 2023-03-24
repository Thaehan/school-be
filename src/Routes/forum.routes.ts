import express, { Express } from 'express'

import forumController from '../Controllers/forum.controller'

const forumRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', forumController.createAsync)

  router.get('/:id', forumController.getByIdAsync)

  router.get('/', forumController.getManyAsync)

  router.post('/update', forumController.updateByIdAsync)

  app.use('/api/notifications', router)
}

export default forumRoutes
