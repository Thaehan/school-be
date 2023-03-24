import dbConfig from '../Config/config'
import mongoose from 'mongoose'
import accountModel from './account.model'
import studentModel from './student.model'
import teacherModel from './teacher.model'
import classModel from './class.model'
import notificationModel from './notification.model'
import forumModel from './forum.model'

mongoose.Promise = global.Promise

export const url = dbConfig.url
export const mongoosee = mongoose
export const accounts = accountModel.accountModel(mongoose)
export const students = studentModel.studentModel(mongoose)
export const teachers = teacherModel.teacherModel(mongoose)
export const classes = classModel.classModel(mongoose)
export const notifications = notificationModel.notificationModel(mongoose)
export const forums = forumModel.forumModel(mongoose)

export default {
  mongoose: mongoose,
  url: url,
  accounts,
  students,
  teachers,
  classes,
  notifications,
  forums,
}
