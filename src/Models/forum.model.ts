import { InferSchemaType, Mongoose, Schema, Types } from 'mongoose'

const forumSchema = new Schema(
  {
    post_owner_id: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    comments: [
      { comment_user_id: Types.ObjectId, content: String, created_at: Date },
    ],
  },
  {
    timestamps: true,
  }
)

const forumModel = (mongoose: Mongoose) => {
  forumSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Forum = mongoose.model('forum', forumSchema)
  return Forum
}

export type IForum = InferSchemaType<typeof forumSchema>

export default {
  forumModel,
  forumSchema,
}
