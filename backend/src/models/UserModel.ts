import { model, ObjectId, Schema } from 'mongoose';

export interface UserDocument {
  _id: ObjectId;
  username: string
  password: string
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  password: { type: String, required: true },
})

const UserModel = model<UserDocument>('users', UserSchema)
export default UserModel