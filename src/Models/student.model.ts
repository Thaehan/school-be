import { InferSchemaType, Mongoose, Schema, Types } from 'mongoose'

const studentSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true },
    student_code: { type: String, required: true },
    name: {
      type: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
      },
      required: true,
    },
    date_of_birth: { type: Date, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'], required: true },
    email: { type: String },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    academic_year: { type: Number, required: false },
    specialization: { type: String, required: false },
    selected_topic_id: { type: String, required: false },
  },
  {
    timestamps: true,
  }
)

const studentModel = (mongoose: Mongoose) => {
  studentSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject()
    object.id = _id
    delete object.__v
    return object
  })

  const Student = mongoose.model('student', studentSchema)
  return Student
}

export type IStudent = InferSchemaType<typeof studentSchema>

export default studentModel
