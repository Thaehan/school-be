import { Request, Response } from 'express'

import { accounts, students } from '../Models'
import { IStudent } from '../Types'
import { hashSyncFunction } from '../Utils/UtilityFunctions'

const Student = students
const Account = accounts

const createAsync = async (req: Request, res: Response) => {
  try {
    const {
      student_code,
      name,
      date_of_birth,
      gender,
      phone_number,
      address,
      academic_year,
      specialization,
      selected_topic_id,
    }: IStudent = req.body

    const { username, password } = req.body

    if (
      !student_code ||
      !name ||
      !date_of_birth ||
      !gender ||
      !phone_number ||
      !address ||
      !username ||
      !password
    ) {
      res.status(400).send({ message: 'Missing required fields' })
      return
    }

    const existedAccount = await Account.findOne({ username })

    if (existedAccount) {
      res.status(400).send({ message: 'Username existed' })
      return
    }

    const existedStudent = await Student.findOne({ student_code })

    if (existedStudent) {
      res.status(400).send({ message: 'Student code existed' })
      return
    }

    const newAccount = await Account.create({
      username,
      password: hashSyncFunction(password),
      role: 'student',
    })

    const newStudent = await Student.create({
      user_id: newAccount.id,
      student_code,
      name,
      date_of_birth,
      gender,
      phone_number,
      address,
      academic_year,
      specialization,
      selected_topic_id,
    })

    res.status(200).send({ data: newStudent })
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
    const result = await Student.find(query)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send({ message: 'Lỗi query truyền vào!' })
    return
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
      res.status(200).send(result)
      return
    }
    res
      .status(404)
      .send({ message: `Cannot find student with id: ${studentId}` })
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
    return
  }
}

const studentSelectTopicAsync = async (req: Request, res: Response) => {
  try {
    const { student_id, topic_id } = req.body

    if (!student_id || !topic_id) {
      res.status(400).send({ message: 'Missing required field(s)' })
      return
    }

    await Student.findByIdAndUpdate(student_id, {
      selected_topic_id: topic_id,
    })

    res.status(200).send('Student selected topic')
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'System error' })
  }
}

export default {
  createAsync,
  getByIdAsync,
  getManyAsync,
  updateByIdAsync,
  studentSelectTopicAsync,
}
