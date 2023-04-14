import express, { Express } from 'express'

import teacherController from '../Controllers/teacher.controller'

const teacherRoutes = (app: Express) => {
  const router = express.Router()

  router.post('/', teacherController.createAsync)

  router.get('/:id', teacherController.getByIdAsync)

  router.get('/', teacherController.getManyAsync)

  router.put('/', teacherController.updateByIdAsync)

  router.delete('/:id', teacherController.deleteByIdAsync)

  app.use('/api/teachers', router)
}

export default teacherRoutes
