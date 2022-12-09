import { MutationResolvers } from '../__generated__/resolvers-types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserDocument } from '../models/UserModel';

const mutations: MutationResolvers = {
  Mutation: {
    signUp: async (_, { username, email, password, first_name, last_name, avatar_url }, { dataSources }) => {
      email = email.trim().toLowerCase();
      const hash = await bcrypt.hash(password, 10);

      try {
        const user = await dataSources.users.addUser({ username, email, password: hash, first_name, last_name, avatar_url });
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
        throw new Error("Error signing in")
      }
    },
    updateUser: async (_, filters: Partial<UserDocument>, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in')
      }
      try {
        return await dataSources.users.editUser(user.id, filters)
      }
      catch (err) {
        console.log(err);
        throw new Error("Error updating user")
      }
    },

    // FAMILY MUTATIONS
    createFamily: async (_, { name, description, avatar_url }, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in')
      }
      try {
        return await dataSources.families.createFamily({ name, description, avatar_url, creator: user.id })
      }
      catch (err) {
        console.log(err);
        throw new Error("Error adding family")
      }
    },

    updateFamily: async (_, { familyId, name, description, avatar_url }, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in')
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new Error('Family not found')
      }

      if (family.creator.toString() !== user.id) {
        throw new Error('You must be the family creator to update the family')
      }

      try {
        return await dataSources.families.updateFamily(familyId, { name, description, avatar_url })
      }
      catch (err) {
        console.log(err);
        throw new Error("Error updating family")
      }
    },

    deleteFamily: async (_, { familyId }, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in')
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new Error('Family not found')
      }

      if (family.creator.toString() !== user.id) {
        throw new Error('You must be the family creator to delete the family')
      }

      try {
        return await dataSources.families.deleteFamily(familyId)
      }
      catch (err) {
        console.log(err);
        throw new Error("Error deleting family")
      }
    },

    inviteToFamily: async (_, { familyId, userId }, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in')
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new Error('Family not found')
      }

      if (family.creator.toString() !== user.id) {
        throw new Error('You must be the family creator to invite users')
      }

      try {
        return await dataSources.families.inviteToFamily(familyId, userId)
      }
      catch (err) {
        console.log(err);
        throw new Error("Error inviting user")
      }
    },

    familyInviteResponse: async (_, { familyId, accept }, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in')
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new Error('Family not found')
      }

      if (!family.invites.includes(user.id)) {
        throw new Error('You have not been invited to this family')
      }

      try {
        return await dataSources.families.familyInviteResponse(familyId, user.id, accept)
      }
      catch (err) {
        console.log(err);
        throw new Error("Error responding to invite")
      }
    },

    removeFamilyMember: async (_, { familyId, userId }, { dataSources, user }) => {
      if (!user) {
        throw new Error('You must be logged in')
      }

      const family = await dataSources.families.getFamily({ _id: familyId });
      if (!family) {
        throw new Error('Family not found')
      }

      if (family.creator.toString() !== user.id || userId === user.id) {
        throw new Error('You are only allowed to remove yourself or you must be the family creator to remove family members')
      }

      try {
        return await dataSources.families.removeFamilyMember(familyId, userId)
      }
      catch (err) {
        console.log(err);
        throw new Error("Error removing family member")
      }
    },
  }
};

export default mutations;
