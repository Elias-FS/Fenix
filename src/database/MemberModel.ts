import mongoose, { Schema } from 'mongoose'

const MemberModel = new Schema(
  {
    name: String,
    email: String,
    document: String,
  },
  { timestamps: true },
)

export default mongoose.model('Member', MemberModel)
