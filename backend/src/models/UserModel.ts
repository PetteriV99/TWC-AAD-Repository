import { model, ObjectId, Schema } from 'mongoose';

export interface UserDocument {
  _id: ObjectId;
  username: string
  email: string
  password: string
  first_name: string
  last_name: string
  avatar_url: string
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  first_name: {type: String},
  last_name: {type: String},
  avatar_url: {type: String}
}, {
  // Assigns createdAt and updatedAt fields with a Date type
  timestamps: true
})

const UserModel = model<UserDocument>('users', UserSchema)
export default UserModel