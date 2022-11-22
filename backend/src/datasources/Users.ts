import UserModel, { UserDocument } from '../models/UserModel';

export default class UsersDataSource {
  private model: typeof UserModel;

  constructor(model: typeof UserModel) {
    this.model = model;
  }

  async getUsers() {
    return await this.model.find();
  }

  async addUser({ username, password }: Pick<UserDocument, 'username' | 'password'>) {
    const newUser = new this.model({
      username,
      password,
    });

    const savedUser = await newUser.save();
    return savedUser;
  }
}