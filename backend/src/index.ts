import * as dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import resolvers from './resolvers/index.js';

// Datasources & Models
import Users from './datasources/Users.js';
import UserModel from './models/UserModel.js';

import Families from './datasources/Families.js';
import FamilyModel from './models/FamilyModel.js';

import ShoppingLists from './datasources/ShoppingList.js';
import ShoppingListModel from './models/ShoppingList.js';

dotenv.config();

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

export interface ServerContext {
  dataSources: {
    users: Users;
    families: Families;
    shoppingLists: ShoppingLists;
  };
  user?: string;
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
});

const getUser = (token: string) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new GraphQLError("You must be logged in", {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      })
    }
  }
};

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const token = (req.headers.authorization && req.headers.authorization.replace(/['"]+/g, '')) || '';
    const user = getUser(token);
    return {
      user,
      dataSources: {
        users: new Users(UserModel),
        families: new Families(FamilyModel),
        shoppingLists: new ShoppingLists(ShoppingListModel),
      },
    };
  },
});

console.log(`🚀 Server listening at: ${url}`);