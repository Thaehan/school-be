import { Request, Response } from 'express'
import { hash, compare } from 'bcrypt'

import { hashSaltRound } from '../Config/config'
import db, { accounts } from '../Models'
import { IAccount } from '../Types'

const Account = accounts

const createAsync = async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body
    if (!username || !password || !role) {
      res.status(400).send({ message: 'Please fill all the information!' })
      return
    }

    if (username.length < 6 || username.length > 16) {
      res
        .status(400)
        .send({ message: 'Username length must be between 6 and 16!' })
      return
    }

    if (password.length < 8 || password.length > 16) {
      res
        .status(400)
        .send({ message: 'Password length must be between 6 and 16!' })
      return
    }

    const existAccount = await Account.find({ username: username })
    if (existAccount.length != 0) {
      res.status(400).send({ message: 'Username is exist!' })
      return
    }

    const data: IAccount = {
      username: req.body.username,
      password: await hash(req.body.password, hashSaltRound),
      role: req.body.role,
    }
    const newAccount = new Account(data)
    const result = await newAccount.save()
    res.status(200).send({ result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const loginAsync = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.query

    if (username && password) {
      const result = await Account.findOne({
        username,
      })

      if (result?.password) {
        const isPasswordTrue = await compare(
          password.toString(),
          result?.password
        )

        if (isPasswordTrue) {
          res.status(200).send({ result })
        } else {
          res.status(400).send({ message: 'Password is incorrect!' })
        }
      } else {
        res.status(404).send({ message: 'Username is not exist!' })
        return
      }
    } else {
      res
        .status(400)
        .send({ message: 'Fill the username and password please!' })
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const findOneAsync = async (req: Request, res: Response) => {
  try {
    const filter = req.body
    const result = await Account.findOne(filter)
    if (!result) {
      res.status(404).send({ message: 'No match found!' })
      return
    } else {
      res.status(200).send({ result })
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const query = req.query
    console.log(query)
    const result = await Account.find(query)
    res.status(200).send({ data: result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id
    console.log('get by id')
    if (!userId) {
      res.status(400).send({ message: 'Cần nhập vào userId' })
      return
    }
    const result = await Account.findById(userId)
    res.status(200).send({ result })
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

const updateAsync = async (req: Request, res: Response) => {
  try {
    const { id, data } = req.body
    console.log('id, data', id, data)
    if (!id || !data) {
      res.status(400).send({ message: 'Please fill the id and data!' })
    }
    if (data.password && data.password.length != 0) {
      data.password = await hash(data.password, hashSaltRound)
    }
    const result = await Account.findByIdAndUpdate(id, data)
    if (result) {
      res.status(200).send({ message: 'Account updated' })
    } else {
      res.status(400).send({ message: 'Error when update account!' })
    }
  } catch (error) {
    res.status(400).send({ message: error })
  }
}

export default {
  createAsync,
  getManyAsync,
  getByIdAsync,
  updateAsync,
  findOneAsync,
  loginAsync,
}
