import { InferSchemaType, Mongoose, Schema, Types } from 'mongoose'

const classSchema = new Schema(
  {
    class_id: { type: String, required: true },
    class_name: { type: String, required: true },
    teacher_id: { type: Types.ObjectId, required: true },
    class_detail: [
      {
        student_id: { type: Types.ObjectId },
        attendence: { type: Number },
        midterm_score: { type: Number },
        final_score: { type: Number },
        violation: { type: [String] },
      },
    ],
    to_do_list: [String],
  },
  {
    timestamps: true,
  }
)

const classModel = (mongoose: Mongoose) => {
  classSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Class = mongoose.model('class', classSchema)
  return Class
}

export type IClass = InferSchemaType<typeof classSchema>

export default {
  classModel,
  classSchema,
}
