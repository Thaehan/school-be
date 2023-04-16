import { Request, Response } from 'express'

import { topics, teachers, students, category } from '../Models'
import { ITopic } from '../Models/topic.model'

const Topic = topics
const Teacher = teachers
const Category = category

const createAsync = async (req: Request, res: Response) => {
  try {
    const { topic_name, detail, teacher_id, tags }: ITopic = req.body

    if (!topic_name || !detail || !teacher_id || !tags) {
      res.status(400).send({ message: 'Missing required field' })
      return
    }

    const existedTopic = await Topic.findOne({ topic_name })

    if (existedTopic) {
      res.status(400).send({ message: 'Topic name is existed' })
      return
    }

    const newTopic = await Topic.create({
      topic_name,
      detail,
      tags,
      teacher_id,
    })

    res.status(200).send({ data: newTopic, message: 'Created a new topic' })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Missing student information!' })
    return
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const { search, ids } = req.query

    let condition: any = {}

    if (search && typeof search === 'string') {
      const standard = search.toLowerCase()
      condition = {
        $or: [
          {
            category_name: { $regex: new RegExp('.*' + standard + '.*', 'i') },
          },
          {
            category_code: { $regex: new RegExp('.*' + standard + '.*', 'i') },
          },
        ],
      }
    }

    if (ids) {
      condition = {
        _id: { $in: ids },
      }
    }

    const listCategory = await Category.find(condition)
    const listCategoryId = listCategory.map((item) => item.id)

    const listTeacher = await Teacher.find({
      main_courses: { $in: listCategoryId },
    })

    const listTopic = await Topic.find({
      tags: { $in: listCategoryId },
    })

    const result = {
      teachers: listTeacher,
      topics: listTopic.map((item) => {
        return {
          ...item.toJSON(),
          creator: listTeacher.find((teacher) => {
            return teacher.id == item.teacher_id
          }),
        }
      }),
    }

    res.status(200).send(result)
  } catch (error) {
    res.status(400).send({ message: 'Lỗi query truyền vào!' })
    return
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    console.log('get by id')
    if (!id || id.length == 0) {
      res.status(400).send({ message: 'Cần nhập vào id của topic!' })
      return
    }

    const result = await Topic.findById(id)

    if (result) {
      res.status(200).send(result)
      return
    }

    res.status(404).send({ message: `Cannot find topic with id: ${id}` })
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
    }

    const result = await Topic.findByIdAndUpdate(id, data)

    if (result) {
      res.status(200).send({ message: 'Topic updated' })
      return
    }

    res.status(400).send({ message: 'Error when update student!' })
  } catch (error) {
    res.status(400).send({ message: 'Id is invalid' })
    return
  }
}

const deleteByIdAsync = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id || id.length == 0) {
      res.status(400).send({ message: 'Cần nhập vào id của topic!' })
      return
    }

    const result = await Topic.findByIdAndDelete(id)

    if (result) {
      res.status(200).send(result)
      return
    }

    res.status(404).send({ message: `Cannot find topic with id: ${id}` })
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
  deleteByIdAsync,
}
