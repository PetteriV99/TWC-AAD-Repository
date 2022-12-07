import { QueryResolvers } from '../__generated__/resolvers-types';

const queries: QueryResolvers = {
  Query: {
    users: async (_, __, contextValue) => {
      const data = await contextValue.dataSources.users.getUsers();
      console.log(data)
      return data;
    }
  },
};

export default queries;
