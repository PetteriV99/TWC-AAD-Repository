import UserModel, { UserDocument } from '../models/UserModel';
import bcrypt from 'bcrypt';

export default class UsersDataSource {
  private model: typeof UserModel;

  constructor(model: typeof UserModel) {
    this.model = model;
  }

  async getUsers() {
    return await this.model.find();
  }

  async getUserById(id: string) {
    const findUser = this.model.findById(id);
    return findUser;
  }

  async getUser({username, email}: Pick<UserDocument, 'username' | 'email'>) {
    const findUser = this.model.findOne({
      $or: [{email}, {username}]
    });
    return findUser;
  }

  async editUser(id: string, updateValues: Partial<UserDocument>) {

    let userValues = updateValues;
    if (updateValues.password) {
      const hash = await bcrypt.hash(updateValues.password, 10);
      userValues = {
        ...updateValues,
        password: hash
      }
    }

    const editedUser = await this.model.findByIdAndUpdate(id, userValues, { new: true });
    return editedUser;
  }

  async addUser({ username, email, password, first_name, last_name, avatar_url}: Pick<UserDocument, 'username' | 'email' | 'password' | 'first_name' | 'last_name' | 'avatar_url'>) {
    const newUser = new this.model({
      username,
      email,
      password,
      first_name,
      last_name,
      avatar_url
    });

    const savedUser = await newUser.save();
    return savedUser;
  }

}