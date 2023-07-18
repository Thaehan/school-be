import { Request, Response } from 'express'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

import { accounts, students, teachers } from '../Models'
import { ACCESS_TOKEN_STATIC, EXPIRATION_TIME } from '../Config/config'

const Account = accounts
const Student = students
const Teacher = teachers

const loginAsync = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      res.status(400).send({ message: 'Missing required field(s)' })
      return
    }

    const result = await Account.findOne({
      username,
    })

    if (!result) {
      res.status(404).send({ message: 'User does not exist!' })
      return
    }

    const isPasswordTrue = await compare(password, result.password)

    if (!isPasswordTrue) {
      res.status(400).send({ message: 'Password is incorrect!' })
      return
    }

    const token = jwt.sign(
      { username, user_id: result.id, role: result.role },
      ACCESS_TOKEN_STATIC
    )

    if (result.role === 'student') {
      const student = await Student.findOne({ user_id: result.id })
      res.status(200).send({
        user: { ...result.toJSON() },
        studentData: student?.toJSON(),
        token,
      })
      return
    }
    if (result.role === 'teacher') {
      const teacher = await Teacher.findOne({ user_id: result.id })
      res.status(200).send({
        user: { ...result.toJSON() },
        teacherData: teacher?.toJSON(),
        token,
      })
      return
    }

    res.status(200).send({ user: result, token })
  } catch (error) {
    res.status(400).send({ message: error })
    return
  }
}

export default { loginAsync }
