import { Request, Response } from 'express'

import { accounts, teachers } from '../Models'
import { ITeacher } from '../Types'
import { hashFunction } from '../Utils/UtilityFunctions'

const Teacher = teachers
const Account = accounts

const createAsync = async (req: Request, res: Response) => {
  try {
    const {
      teacher_code,
      name,
      date_of_birth,
      gender,
      phone_number,
      address,
      main_courses,
      topic_ids,
    }: ITeacher = req.body
    const { username, password } = req.body

    if (
      !username ||
      !password ||
      !teacher_code ||
      !name ||
      !date_of_birth ||
      !gender ||
      !phone_number ||
      !address
    ) {
      res.status(400).send({ message: 'Missing required field(s)' })
      return
    }

    const accountWithUsername = await Account.findOne({ username })

    if (accountWithUsername) {
      res.status(400).send({ message: 'Username is existed' })
      return
    }

    const existedTeacher = await Teacher.findOne({ teacher_code })

    if (existedTeacher) {
      res.status(400).send({ message: 'Teacher code existed' })
      return
    }

    const newAccount = await Account.create({
      username,
      password: hashFunction(password),
      role: 'teacher',
    })

    const newTeacher = await Teacher.create({
      teacher_code,
      name,
      date_of_birth,
      gender,
      phone_number,
      address,
      main_courses,
      topic_ids,
      user_id: newAccount.id,
    })

    res.status(200).send({
      message: 'Teacher created',
      data: { ...newTeacher, username, password },
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Missing student information!' })
    return
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
    return
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
    return
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
    return
  }
}

export default {
  createAsync,
  getByIdAsync,
  getManyAsync,
  updateByIdAsync,
}
