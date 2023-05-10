import { Request, Response } from 'express'

import { topics, teachers, category } from '../Models'
import { ITopic } from '../Models/topic.model'
import { regexString } from '../Utils/UtilityFunctions'

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
      rating: [],
      ratingPoint: 0,
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
            category_name: { $regex: regexString(standard), $options: 'i' },
          },
          {
            category_code: { $regex: regexString(standard), $options: 'i' },
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

    console.log(listTopic)

    listTopic.sort((a, b) => {
      if (a.ratingPoint < b.ratingPoint) {
        return 1
      }
      if (a.ratingPoint > b.ratingPoint) {
        return -1
      }
      return 0
    })

    console.log(listTopic)

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
    console.log(error)
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

const ratingTopicAsync = async (req: Request, res: Response) => {
  try {
    const { teacherId, topicId, rating } = req.body
    if (!teacherId || !topicId || !rating) {
      res.status(400).send({ message: 'Missing required field(s)!' })
      return
    }

    const topic = await Topic.findById(topicId)

    if (!topic) {
      res.status(404).send({ message: `Cannot find topic with id: ${topicId}` })
      return
    }

    const currentTopicRating = topic.rating
    let currentRatingPoint = rating

    let existedRatingIndex = -1

    currentTopicRating.forEach((item, index) => {
      if (item.level && item.teacherId !== teacherId) {
        currentRatingPoint += item.level
      }
      if (item.teacherId == teacherId) {
        existedRatingIndex = index
      }
    })

    if (existedRatingIndex >= 0) {
      currentTopicRating[existedRatingIndex] = { level: rating, teacherId }
    } else {
      currentTopicRating.push({ level: rating, teacherId })
    }

    const updatedTopic = await Topic.findByIdAndUpdate(topicId, {
      rating: currentTopicRating,
      ratingPoint: currentRatingPoint / currentTopicRating.length,
    })

    if (updatedTopic) {
      res.status(200).send({ message: 'Updated' })
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
  deleteByIdAsync,
  ratingTopicAsync,
}
