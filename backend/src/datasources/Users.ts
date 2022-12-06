import UserModel, { UserDocument } from '../models/UserModel';

export default class UsersDataSource {
  private model: typeof UserModel;

  constructor(model: typeof UserModel) {
    this.model = model;
  }

  async getUsers() {
    return await this.model.find();
  }

  async getUser({username, email}: Pick<UserDocument, 'username' | 'email'>) {
    const findUser = this.model.findOne({
      $or: [{email}, {username}]
    });
    return findUser;
  }

  async addUser({ username, email, password }: Pick<UserDocument, 'username' | 'email' | 'password'>) {
    const newUser = new this.model({
      username,
      email,
      password,
    });

    const savedUser = await newUser.save();
    return savedUser;
  }

}