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

  async editUser({username, first_name, last_name, avatar_url}: Pick<UserDocument, 'username' | 'first_name' | 'last_name' | 'avatar_url'>) {
    const editedUser = await this.model.findOneAndUpdate();
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