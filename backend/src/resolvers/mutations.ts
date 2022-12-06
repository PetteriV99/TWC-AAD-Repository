import { MutationResolvers } from '../__generated__/resolvers-types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const mutations: MutationResolvers = {
  Mutation: {
    signUp: async (_, { username, email, password }, { dataSources }) => {
      email = email.trim().toLowerCase();
      const hash = await bcrypt.hash(password, 10);

      try {
        const user = await dataSources.users.addUser({ username, email, password });
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
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
        const valid = await bcrypt.compare(password, user.password);

        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      }
      catch (err) {
        console.log(err);
        throw new Error("Error signing in")
      }

    }
  }
};

export default mutations;
