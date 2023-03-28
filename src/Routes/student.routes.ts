import express, { Express } from 'express'

import studentController from '../Controllers/student.controller'

const studentRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', studentController.createAsync)

  router.get('/:id', studentController.getByIdAsync)

  router.get('/', studentController.getManyAsync)

  router.post('/update', studentController.updateByIdAsync)

  router.put('/', studentController.studentSelectTopicAsync)

  app.use('/api/students', router)
}

export default studentRoutes
