import { QueryResolvers } from '../__generated__/resolvers-types';

// Use the generated `QueryResolvers` type to type check our queries!
const queries: QueryResolvers = {
  Query: {
    // Our third argument (`contextValue`) has a type here, so we
    // can check the properties within our resolver's shared context value.
    families: async (_, __, contextValue) => {
      return await contextValue.dataSources.shoppingAPI.getFamilies();
    },
  },
};

export default queries;
