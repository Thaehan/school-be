import { InferSchemaType, Mongoose, Schema, Types } from 'mongoose'

const teacherSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true },
    teacher_id: { type: String, required: true },
    name: {
      type: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
      },
      required: true,
    },
    date_of_birth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    nation: { type: String, required: true },
    joined_date: { type: Date, required: true },
    main_courses: [String],
    teaching_class_ids: [Types.ObjectId],
  },
  {
    timestamps: true,
  }
)

const teacherModel = (mongoose: Mongoose) => {
  teacherSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject()
    object.id = _id
    return object
  })

  const Teacher = mongoose.model('teacher', teacherSchema)
  return Teacher
}

export type ITeacher = InferSchemaType<typeof teacherSchema>

export default {
  teacherModel,
  teacherSchema,
}
