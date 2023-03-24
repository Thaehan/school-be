import { Request, Response } from 'express'

import { hashSaltRound } from '../Config/config'
import { accounts, classes } from '../Models'
import { IClass } from '../Types'

const Class = classes
const Account = accounts

const createAsync = async (req: Request, res: Response) => {
  try {
    const classData: IClass = req.body

    const existClass = await Class.find({
      class_id: classData.class_id,
    })
    if (existClass.length != 0) {
      res.status(400).send({ message: 'Class Id is exist!' })
      return
    } else {
      const existTeacher = await Account.findById(classData.teacher_id)
      if (existTeacher) {
        const newClass = new Class(classData)
        const result = await newClass.save()
        res.status(200).send({ result: result })
      } else {
        res.status(400).send({ message: 'Teacher id is not exist!' })
      }
    }
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Missing information' })
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const query = req.query

    console.log('filter', query)

    const result = await Class.find(query)
    res.status(200).send({ result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const classId = req.params.id
    console.log('get by id')
    if (!classId) {
      res.status(400).send({ message: 'Cần nhập vào id của Class!' })
      return
    }
    const result = await Class.findById(classId)
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
      const result = await Class.findByIdAndUpdate(id, data)
      if (result) {
        res.status(200).send({ message: 'Class updated' })
      } else {
        res.status(400).send({ message: 'Error when update class!' })
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
