import { Request, Response } from 'express'

import { hashSaltRound } from '../Config/config'
import { forums } from '../Models'
import { IForum } from '../Types'

const Forum = forums

const createAsync = async (req: Request, res: Response) => {
  try {
    const forumData: IForum = req.body

    const newForum = new Forum(forumData)
    const result = await newForum.save()
    res.status(200).send({ result })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Missing forum information!' })
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const query = req.query

    console.log('filter', query)

    const result = await Forum.find(query)
    res.status(200).send({ result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const forumId = req.params.id
    console.log('get by id')
    if (!forumId) {
      res.status(400).send({ message: 'Cần nhập vào id của Forum!' })
      return
    }
    const result = await Forum.findById(forumId)
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
      const result = await Forum.findByIdAndUpdate(id, data)
      if (result) {
        res.status(200).send({ message: 'Forum updated' })
      } else {
        res.status(400).send({ message: 'Error when update forum!' })
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
