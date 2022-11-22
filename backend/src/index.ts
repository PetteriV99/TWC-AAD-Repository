import * as dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import mongoose from 'mongoose';

import resolvers from './resolvers/index.js';

// Datasources & Models
import Users from './datasources/Users.js';
import UserModel from './models/UserModel.js';

dotenv.config();

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.
const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

export interface ServerContext {
  dataSources: {
    users: Users;
  };
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      dataSources: {
        users: new Users(UserModel),
      },
    };
  },
});

console.log(`🚀 Server listening at: ${url}`);