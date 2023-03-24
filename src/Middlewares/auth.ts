import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_STATIC } from '../Config/config'

const auth = async (req: Request, res: Response, next: Function) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (token) {
      const decodedToken = jwt.verify(token, ACCESS_TOKEN_STATIC)
      req.body.decodedData = decodedToken
      next()
    }
  } catch (error) {
    res.status(401).send({ message: 'Unauthorized' })
  }
}

export { auth }
