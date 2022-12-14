import { MutationResolvers } from '../__generated__/resolvers-types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import { UserDocument } from '../models/UserModel';

import ShoppingList from './mutations/ShoppingList.js';

const mutations: MutationResolvers = {
  Mutation: {

    // ShoppingList Mutations
    ...ShoppingList,

    /*
      Could move these to a separate file similar to the ShoppingList mutations?
    */

    signUp: async (_, { username, email, password, first_name, last_name, avatar_url }, { dataSources }) => {

      try {
        const user = await dataSources.users.addUser({ username, email, password, first_name, last_name, avatar_url });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        return token;
      }
      catch (err) {
        console.log(err.name);
        if (err.name === 'ValidationError') {
          throw new GraphQLError("Error creating account. Check credentials/password.")
        }
        else {
          throw new GraphQLError("Error creating account. This email/username is already in use.");
        }
      }
    },
    logIn: async (_, { username, email, password }, { dataSources }) => {
      if (email) {
        email = email.trim().toLowerCase();
      }

      const user = await dataSources.users.getUser({ email, username })
      if (!user) {
        throw new GraphQLError('Error signing in. Your username and/or password do not match.', {
          extensions: {
            code: 'FORBIDDEN',
          },
        });
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new GraphQLError('Error signing in. Your username and/or password do not match.', {
          extensions: {
            code: 'FORBIDDEN',
          },
        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return token;

    },

    updateUser: async (_, filters: Partial<UserDocument>, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError('You must be logged in')
      }
      try {
        return await dataSources.users.editUser(user.id, filters)
      }
      catch (err) {
        console.log(err);
        throw new GraphQLError("Error updating user")
      }
    },

    // FAMILY MUTATIONS
    createFamily: async (_, { name, description, avatar_url }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError('You must be logged in')
      }
      try {
        return await dataSources.families.createFamily({ name, description, avatar_url, creator: user.id })
      }
      catch (err) {
        console.log(err);
        throw new GraphQLError("Error adding family")
      }
    },

    updateFamily: async (_, { familyId, name, description, avatar_url }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError('You must be logged in')
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new GraphQLError('Family not found')
      }

      if (family.creator.toString() !== user.id) {
        throw new GraphQLError('You must be the family creator to update the family')
      }

      try {
        return await dataSources.families.updateFamily(familyId, { name, description, avatar_url })
      }
      catch (err) {
        console.log(err);
        throw new GraphQLError("Error updating family")
      }
    },

    deleteFamily: async (_, { familyId }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError('You must be logged in')
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new GraphQLError('Family not found')
      }

      if (family.creator.toString() !== user.id) {
        throw new GraphQLError('You must be the family creator to delete the family')
      }

      try {
        return await dataSources.families.deleteFamily(familyId)
      }
      catch (err) {
        console.log(err);
        throw new GraphQLError("Error deleting family")
      }
    },

    inviteToFamily: async (_, { familyId, userId }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError('You must be logged in')
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new GraphQLError('Family not found')
      }

      if (family.creator.toString() !== user.id) {
        throw new GraphQLError('You must be the family creator to invite users')
      }

      try {
        return await dataSources.families.inviteToFamily(familyId, userId)
      }
      catch (err) {
        console.log(err);
        throw new GraphQLError("Error inviting user")
      }
    },

    familyInviteResponse: async (_, { familyId, accept }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError('You must be logged in')
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new GraphQLError('Family not found')
      }

      if (!family.invites.includes(user.id)) {
        throw new GraphQLError('You have not been invited to this family')
      }

      try {
        return await dataSources.families.familyInviteResponse(familyId, user.id, accept)
      }
      catch (err) {
        console.log(err);
        throw new GraphQLError("Error responding to invite")
      }
    },

    removeFamilyMember: async (_, { familyId, userId }, { dataSources, user }) => {
      if (!user) {
        throw new GraphQLError('You must be logged in')
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new GraphQLError('Family not found')
      }

      if (family.creator.toString() !== user.id || userId === user.id) {
        throw new GraphQLError('You are only allowed to remove yourself or you must be the family creator to remove family members')
      }

      try {
        return await dataSources.families.removeFamilyMember(familyId, userId)
      }
      catch (err) {
        console.log(err);
        throw new GraphQLError("Error removing family member")
      }
    },
  }
};

export default mutations;
