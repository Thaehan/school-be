import express, { Express } from 'express'

import categoryController from '../Controllers/category.controller'

const studentRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', categoryController.createAsync)

  router.get('/:id', categoryController.getByIdAsync)

  router.get('/', categoryController.getManyAsync)

  router.post('/update', categoryController.updateByIdAsync)

  app.use('/api/categories', router)
}

export default studentRoutes
