import { InferSchemaType, Mongoose, Schema, Types } from 'mongoose'

const notificationSchema = new Schema(
  {
    class_id: { type: Types.ObjectId, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    expiration_date: { type: Date },
  },
  {
    timestamps: true,
  }
)

const notificationModel = (mongoose: Mongoose) => {
  notificationSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Notification = mongoose.model('notification', notificationSchema)
  return Notification
}

export type INotification = InferSchemaType<typeof notificationSchema>

export default {
  notificationModel,
  notificationSchema,
}
