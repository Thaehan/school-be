import { InferSchemaType, Mongoose, Schema, Types } from 'mongoose'

const topicSchema = new Schema(
  {
    topic_name: { type: String, required: true },
    topic_code: { type: String, required: true },
    description: { type: String, required: true },
    teacher_id: { type: Types.ObjectId, required: true },
    selected_student: {type: [Types.ObjectId], required: true, default: []},
  },
  {
    timestamps: true,
  }
)

const topicModel = (mongoose: Mongoose) => {
  topicSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Topic = mongoose.model('topic', topicSchema)
  return Topic
}

export type ITopic = InferSchemaType<typeof topicSchema>

export default topicModel
