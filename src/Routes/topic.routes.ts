import express, { Express } from 'express'

import topicController from '../Controllers/topic.controller'
import { auth } from '../Middlewares/auth'

const topicRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', topicController.createAsync)

  router.get('/', topicController.getManyAsync)

  router.get('/:id', auth, topicController.getByIdAsync)

  router.put('/:id', topicController.updateByIdAsync)

  app.use('/api/topics', router)
}

export default topicRoutes
