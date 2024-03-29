import { QueryResolvers } from '../__generated__/resolvers-types';

const queries: QueryResolvers = {
  Query: {
    users: async (_, __, contextValue) => {
      const data = await contextValue.dataSources.users.getUsers();
      return data;
    },

    currentUser: async (_, __, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in');
      }

      const data = await dataSources.users.getUserById(user.id);
      return data;
    },

    // FAMILY RELATED QUERIES
    families: async (_, __, contextValue) => {
      const data = await contextValue.dataSources.families.getFamilies();
      return data;
    },

    family: async (_, { _id, name }, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in');
      }

      if (!_id && !name) {
        throw new Error('You must provide an id or name');
      }

      let family;
      if (_id) {
        family = await dataSources.families.getFamily({ _id });
      } else {
        family = await dataSources.families.getFamily({ name });
      }
      
      if (!family) {
        throw new Error('Family not found');
      }

      if (family.creator.toString() !== user.id && !family.members.includes(user.id)) {
        throw new Error('You must be a member of the family to view the family');
      }

      return family;
    },

    currentUserFamilies: async (_, __, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in');
      }
      
      const data = await dataSources.families.getUserFamilies(user.id);
      return data;
    },

    familyLists: async (_, { familyId }, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in');
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new Error('Family not found');
      }

      if (family.creator.toString() !== user.id && !family.members.includes(user.id)) {
        throw new Error('You must be a member of the family to view the family lists');
      }

      const data = await dataSources.families.getFamilyLists(familyId);
      return data;
    },

    userFamilies: async (_, __, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in');
      }

      const data = await dataSources.families.getUserFamilies(user.id);
      return data;
    },

    userInvites: async (_, __, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in');
      }

      const data = await dataSources.families.getUserInvites(user.id);
      return data;
    },

    shoppingList: async (_, {_id}, {dataSources, user}) => {
      if (!user) {
        throw new Error('You must be logged in');
      }

      const data = await dataSources.shoppingLists.getShoppingList(_id);
      return data;
    },

    userFamilyLists: async (_, __, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in');
      }

      const families = await dataSources.families.getUserFamilyLists(user.id);

      return families;
    },
  },
};

export default queries;
