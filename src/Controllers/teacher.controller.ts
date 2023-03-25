import { Request, Response } from 'express'

import { accounts, teachers } from '../Models'
import { ITeacher } from '../Types'

const Teacher = teachers
const Account = accounts

const createAsync = async (req: Request, res: Response) => {
  try {
    const teacherData: ITeacher = req.body
    console.log('teacherData ', teacherData)

    const existAccount = await Account.findById(teacherData.user_id)
    if (!existAccount) {
      res.status(404).send({ message: 'User_id is not exist!' })
      return
    } else {
      if (existAccount.role != 'teacher') {
        res.status(400).send({ message: 'Account role is not match!' })
        return
      } else {
        const existTeacher = await Teacher.find().or([
          {
            teacher_code: teacherData.teacher_code,
          },
          { user_id: teacherData.user_id },
        ])
        if (existTeacher.length != 0) {
          res
            .status(400)
            .send({
              message: 'Teacher is exist or user has a teacher account!',
            })
          return
        } else {
          const newTeacher = new Teacher(teacherData)
          const resData = await newTeacher.save()
          res.status(200).send({ result: resData.toJSON() })
        }
      }
    }
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Missing student information!' })
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const query = req.query
    console.log(query)
    const result = await Teacher.find(query)
    res.status(200).send({ result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id
    console.log('get by id')
    if (!studentId) {
      res.status(400).send({ message: 'Cần nhập vào id của Teacher!' })
      return
    }
    const result = await Teacher.findById(studentId)
    res.status(200).send({ result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const updateByIdAsync = async (req: Request, res: Response) => {
  try {
    const { id, data } = req.body
    console.log('data', id, data)
    if (!id || !data) {
      res.status(400).send({ message: 'Please fill the id and data!' })
      return
    } else {
      const result = await Teacher.findByIdAndUpdate(id, data)
      if (result) {
        res.status(200).send({ message: 'Teacher updated' })
      } else {
        res.status(400).send({ message: 'Error when update student!' })
      }
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

export default {
  createAsync,
  getByIdAsync,
  getManyAsync,
  updateByIdAsync,
}
