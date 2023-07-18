import express, { Express } from 'express'

import studentController from '../Controllers/student.controller'

const studentRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', studentController.createAsync)

  router.get('/:id', studentController.getByIdAsync)

  router.get('/', studentController.getManyAsync)

  router.put('/update', studentController.updateByIdAsync)

  router.put('/', studentController.studentSelectTopicAsync)

  router.delete('/:id', studentController.deleteByIdAasync)

  app.use('/api/students', router)
}

export default studentRoutes
