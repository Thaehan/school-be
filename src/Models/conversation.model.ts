import { InferSchemaType, Mongoose, Schema } from 'mongoose'

const conversationSchema = new Schema(
  {
    users: {
      type: [String],
      required: true,
    },
    history: {
      type: [
        {
          userId: String,
          text: String,
          createdAt: Date,
        },
      ],
      required: true,
    },
    readers: [String],
  },
  {
    timestamps: true,
  }
)

const conversationModel = (mongoose: Mongoose) => {
  conversationSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject()
    object.id = _id
    delete object.__v
    return object
  })

  const Conversation = mongoose.model('conversation', conversationSchema)
  return Conversation
}

export type IConversation = InferSchemaType<typeof conversationSchema>

export default conversationModel
