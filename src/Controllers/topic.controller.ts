import { Request, Response } from 'express'

import { topics, teachers, students } from '../Models'
import { ITopic } from '../Models/topic.model'

const Topic = topics
const Teacher = teachers

const createAsync = async (req: Request, res: Response) => {
  try {
    const { topic_name, detail, teacher_id }: ITopic = req.body

    if (!topic_name || detail || teacher_id) {
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
      teacher_id,
      selected_student: [],
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
    const query = req.query
    const result = await Topic.find(query)

    const topicIdList: string[] = []

    result.forEach((item) => {
      if (!topicIdList.includes(item.id)) {
        topicIdList.push(item.id)
      }
    })

    const creatorList = await Teacher.find({ id: { $in: topicIdList } })
    const creatorListRef: Record<string, any> = {}

    creatorList.forEach((item) => {
      if (!creatorListRef[item.id]) {
        creatorListRef[item.id] = item.toJSON()
      }
    })

    console.log('creator', creatorListRef)

    const resultList: any = result.map((item) => {
      return {
        ...item.toJSON(),
        creator: creatorListRef[item.toJSON().teacher_id],
      }
    })

    res.status(200).send(resultList)
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
      res.status(400).send({ message: 'Cần nhập vào id của Student!' })
      return
    }

    const result = await Topic.findById(id)

    if (result) {
      res.status(200).send(result)
      return
    }

    res.status(404).send({ message: `Cannot find student with id: ${id}` })
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

export default {
  createAsync,
  getByIdAsync,
  getManyAsync,
  updateByIdAsync,
}
