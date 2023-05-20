import { InferSchemaType, Mongoose, Schema, Types } from 'mongoose'

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
    },
    category_code: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

const categoryModel = (mongoose: Mongoose) => {
  categorySchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject()
    object.id = _id
    delete object.__v
    return object
  })

  const Category = mongoose.model('category', categorySchema)
  return Category
}

export type ICategory = InferSchemaType<typeof categorySchema>

export default categoryModel
