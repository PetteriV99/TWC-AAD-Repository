import { MutationResolvers } from '../__generated__/resolvers-types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const mutations: MutationResolvers = {
  Mutation: {
    signUp: async (_, { username, email, password }, { dataSources }) => {
      email = email.trim().toLowerCase();
      const hash = await bcrypt.hash(password, 10);

      try {
        const user = await dataSources.users.addUser({ username, email, password: hash });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return token;
      }
      catch (err) {
        console.log(err);
        throw new Error("Error creating account");
      }
    },
    logIn: async (_, { username, email, password }, { dataSources }) => {
      if (email) {
        email = email.trim().toLowerCase();
      }

      try {
        const user = await dataSources.users.getUser({ email, username })
        if (!user) {
          throw new Error('Error signing in');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          throw new Error('Error signing in');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return token;
      }
      catch (err) {
        console.log(err);
        throw new Error("Error signing in")
      }

    }
  }
};

export default mutations;
