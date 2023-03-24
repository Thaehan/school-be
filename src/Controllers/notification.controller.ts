import { Request, Response } from 'express'

import { hashSaltRound } from '../Config/config'
import { notifications } from '../Models'
import { INotification } from '../Types'

const Notification = notifications

const createAsync = async (req: Request, res: Response) => {
  try {
    const notificationData: INotification = req.body

    const newNotification = new Notification(notificationData)
    const result = await newNotification.save()
    res.status(200).send({ result })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Missing notification information!' })
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const query = req.query

    console.log('filter', query)

    const result = await Notification.find(query)
    res.status(200).send({ result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id
    console.log('get by id')
    if (!notificationId) {
      res.status(400).send({ message: 'Cần nhập vào id của Notification!' })
      return
    }
    const result = await Notification.findById(notificationId)
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
      const result = await Notification.findByIdAndUpdate(id, data)
      if (result) {
        res.status(200).send({ message: 'Notification updated' })
      } else {
        res.status(400).send({ message: 'Error when update notification!' })
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
