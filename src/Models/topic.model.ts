import { InferSchemaType, Mongoose, Schema, Types } from 'mongoose'

const topicSchema = new Schema(
  {
    topic_name: { type: String, required: true },
    detail: { type: String, required: true },
    teacher_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const topicModel = (mongoose: Mongoose) => {
  topicSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Topic = mongoose.model('topic', topicSchema)
  return Topic
}

export type ITopic = InferSchemaType<typeof topicSchema>

export default topicModel
