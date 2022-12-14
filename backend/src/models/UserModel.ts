import { model, ObjectId, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
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
  username: { type: String, required: [true, 'Enter a username.'], index: { unique: true, } },
  email: { type: String, required: [true, 'Enter an email address.'], lowercase: true, index: { unique: true } },
  password: { type: String, required: [true, 'Enter a password.'], minlength: [1, 'Password needs to be at least five characters.'] },
  first_name: { type: String },
  last_name: { type: String },
  avatar_url: { type: String }
}, {
  // Assigns createdAt and updatedAt fields with a Date type
  timestamps: true
})

//schema middleware to apply before saving
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const UserModel = model<UserDocument>('users', UserSchema)
export default UserModel