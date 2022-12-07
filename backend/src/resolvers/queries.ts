import { QueryResolvers } from '../__generated__/resolvers-types';

const queries: QueryResolvers = {
  Query: {
    users: async (_, __, contextValue) => {
      const data = await contextValue.dataSources.users.getUsers();
      return data;
    },

    // FAMILY RELATED QUERIES
    families: async (_, __, contextValue) => {
      const data = await contextValue.dataSources.families.getFamilies();
      return data;
    }, 
  },
};

export default queries;
