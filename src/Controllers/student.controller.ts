import { Request, Response } from 'express'

import { hashSaltRound } from '../Config/config'
import { accounts, students } from '../Models'
import { IStudent } from '../Types'

const Student = students
const Account = accounts

const createAsync = async (req: Request, res: Response) => {
  try {
    const studentData: IStudent = req.body

    const existAccount = await Account.findById(studentData.user_id)
    if (!existAccount) {
      res.status(404).send({ message: 'User_id is not exist!' })
      return
    } else {
      if (existAccount.role != 'student') {
        res.status(400).send({ message: 'Role of account is not match!' })
        return
      } else {
        const existStudent = await Student.find().or([
          {
            student_code: studentData.student_code,
          },
          { user_id: studentData.user_id },
        ])
        if (existStudent.length != 0) {
          res.status(400).send({
            message:
              'Student Id is exist or user has a student account already!',
          })
          return
        } else {
          const newStudent = new Student(studentData)
          const resData = await newStudent.save()
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
    const result = await Student.find(query)
    res.status(200).send({ result })
  } catch (error) {
    res.status(400).send({ message: 'Lỗi query truyền vào!' })
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id
    console.log('get by id')
    if (!studentId || studentId.length == 0) {
      res.status(400).send({ message: 'Cần nhập vào id của Student!' })
      return
    }
    const result = await Student.findById(studentId)
    if (result) {
      res.status(200).send({ result })
      return
    }
    res
      .status(404)
      .send({ message: `Cannot find student with id: ${studentId}` })
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
    } else {
      const result = await Student.findByIdAndUpdate(id, data)
      if (result) {
        res.status(200).send({ message: 'Student updated' })
      } else {
        res.status(400).send({ message: 'Error when update student!' })
      }
    }
  } catch (error) {
    res.status(400).send({ message: 'Id is invalid' })
  }
}

export default {
  createAsync,
  getByIdAsync,
  getManyAsync,
  updateByIdAsync,
}
