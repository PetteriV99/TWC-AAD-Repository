import { MutationResolvers } from '../__generated__/resolvers-types';

const mutations: MutationResolvers = {
  Mutation: {
    addUser: async (_, { username, password }, { dataSources }) => {
      return await dataSources.users.addUser({ username, password });
    },
  },
};

export default mutations;
