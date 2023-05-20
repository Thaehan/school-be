import { Request, Response } from 'express'

import { topics, teachers, category, conversations } from '../Models'
import { IConversation } from '../Types'

const Topic = topics
const Conversation = conversations

const createAsync = async (req: Request, res: Response) => {
  try {
    const { users }: IConversation = req.body

    const newConversation = await Topic.create({
      users,
      history: [],
    })

    res
      .status(200)
      .send({ data: newConversation, message: 'Created a new topic' })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Missing conversation information!' })
    return
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query

    const conversation = await Conversation.find({
      users: {
        $elemMatch: {
          $eq: userId,
        },
      },
    }).sort('-updatedAt')

    res.status(200).send(conversation)
    return
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'Lỗi query truyền vào!' })
    return
  }
}

const updateByIdAsync = async (req: Request, res: Response) => {
  try {
    const { id, newDialog } = req.body
    console.log('data', id, newDialog)
    if (!id || !newDialog) {
      res.status(400).send({ message: 'Please fill the id and data!' })
      return
    }

    const conversation = await Conversation.findById(id)

    if (!conversation) {
      res.status(400).send({ message: 'Not found' })
      return
    }

    const result = await Conversation.findByIdAndUpdate(id, {
      history: [...conversation.history, newDialog],
    })

    if (result) {
      res.status(200).send({ message: 'Topic updated' })
      return
    }

    res.status(400).send({ message: 'Error when update conversation!' })
  } catch (error) {
    res.status(400).send({ message: 'Id is invalid' })
    return
  }
}

const getOrCreateAsync = async (req: Request, res: Response) => {
  try {
    const { users } = req.body

    const conversationResult = await Conversation.findOne({
      $or: [
        {
          users: [users[0], users[1]],
        },
        {
          users: [users[1], users[0]],
        },
      ],
    })

    if (conversationResult) {
      res.status(200).send(conversationResult)
      return
    }

    const newConversation = await Conversation.create({
      users,
      history: [],
    })

    res.status(200).send(newConversation)
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Id is invalid' })
  }
}

export default {
  createAsync,
  getManyAsync,
  updateByIdAsync,
  getOrCreateAsync,
}
