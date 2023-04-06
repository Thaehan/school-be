import dbConfig from '../Config/config'
import mongoose from 'mongoose'
import accountModel from './account.model'
import studentModel from './student.model'
import teacherModel from './teacher.model'
import topicModel from './topic.model'
import categoryModel from './category.model'

mongoose.Promise = global.Promise

export const url = dbConfig.url
export const mongoosee = mongoose
export const accounts = accountModel(mongoose)
export const students = studentModel(mongoose)
export const teachers = teacherModel(mongoose)
export const topics = topicModel(mongoose)
export const category = categoryModel(mongoose)

export default {
  mongoose,
  url,
  accounts,
  students,
  teachers,
  topics,
  category,
}
