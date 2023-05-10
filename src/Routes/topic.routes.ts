import express, { Express } from 'express'

import topicController from '../Controllers/topic.controller'
import { auth } from '../Middlewares/auth'

const topicRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', topicController.createAsync)

  router.get('/', topicController.getManyAsync)

  router.get('/:id', auth, topicController.getByIdAsync)

  router.put('/', topicController.updateByIdAsync)

  router.put('/rating/', topicController.ratingTopicAsync)

  router.delete('/:id', topicController.deleteByIdAsync)

  app.use('/api/topics', router)
}

export default topicRoutes
