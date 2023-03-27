import { Express } from 'express'

import accountRoutes from './account.routes'
import studentRoutes from './student.routes'
import teacherRoutes from './teacher.routes'
import authRoutes from './auth.routes'
import topicRoutes from './topic.routes'

const setRoutes = (app: Express) => {
  //Declare all routes
  authRoutes(app)
  accountRoutes(app)
  studentRoutes(app)
  teacherRoutes(app)
  topicRoutes(app)
}

export { setRoutes }
