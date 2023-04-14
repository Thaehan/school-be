import { Request, Response } from 'express'

import { category } from '../Models'
import { ICategory } from '../Types'

const Category = category

const createAsync = async (req: Request, res: Response) => {
  try {
    const { category_code, category_name, description }: ICategory = req.body

    if (!category_code || !category_name) {
      res.status(400).send({ message: 'Missing required fields' })
      return
    }

    const existedCategory = await Category.findOne({
      $or: [{ category_code }, { category_name }],
    })

    if (existedCategory) {
      res.status(400).send({ message: 'Category name or code existed' })
      return
    }

    const newCategory = await Category.create({
      category_name,
      category_code,
      description: description ?? '',
    })

    res.status(200).send({ data: newCategory })
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Missing information!' })
    return
  }
}

const getManyAsync = async (req: Request, res: Response) => {
  try {
    const query = req.query
    console.log(query)
    const result = await Category.find(query)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send({ message: 'Lỗi query truyền vào!' })
    return
  }
}

const getByIdAsync = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id
    console.log('get by id')
    if (!categoryId || categoryId.length == 0) {
      res.status(400).send({ message: 'Cần nhập vào id của Category!' })
      return
    }
    const result = await Category.findById(categoryId)
    if (result) {
      res.status(200).send(result)
      return
    }
    res
      .status(404)
      .send({ message: `Cannot find category with id: ${categoryId}` })
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
    } else {
      // const existedCategory = await Category.find({
      //   $or: [
      //     { category_name: data.category_name },
      //     { category_code: data.category_code },
      //   ],
      // })
      // if (existedCategory.length == 1 && (data.category_name == category)) {
      //   res.status(400).send({ message: 'Category name or code existed!' })
      //   return
      // }
      const result = await Category.findByIdAndUpdate(id, data)
      if (result) {
        res
          .status(200)
          .send({ message: 'Student updated', data: result.toJSON() })
      } else {
        res.status(400).send({ message: 'Error when update student!' })
      }
    }
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
