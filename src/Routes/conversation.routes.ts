import express, { Express } from 'express'

import conversationController from '../Controllers/conversation.controller'

const conversationRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', conversationController.createAsync)

  router.get('/', conversationController.getManyAsync)

  router.put('/', conversationController.updateByIdAsync)

  router.post('/get-or-create/', conversationController.getOrCreateAsync)

  app.use('/api/conversations', router)
}

export default conversationRoutes
