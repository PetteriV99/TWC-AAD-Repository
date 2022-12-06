import { model, ObjectId, Schema } from 'mongoose';

export interface UserDocument {
  _id: ObjectId;
  username: string
  email: string
  password: string
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
}, {
  // Assigns createdAt and updatedAt fields with a Date type
  timestamps: true
})

const UserModel = model<UserDocument>('users', UserSchema)
export default UserModel