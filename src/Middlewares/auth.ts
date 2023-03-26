import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_STATIC } from '../Config/config'

const auth = async (req: Request, res: Response, next: any) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.status(400).send({ message: 'Missing token' })
      return
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_STATIC)
    req.body.user = decodedToken
    if (!decodedToken) {
      res.status(401).send({ message: 'Unauthorized' })
      return
    }
    next()
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' })
    return
  }
}

export { auth }
