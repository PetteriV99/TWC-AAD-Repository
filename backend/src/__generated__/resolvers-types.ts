import { GraphQLResolveInfo } from 'graphql';
import { ServerContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Family = {
  __typename?: 'Family';
  _id: Scalars['ID'];
  avatar_url?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['ID']>;
  description?: Maybe<Scalars['String']>;
  invites?: Maybe<Array<Maybe<Scalars['ID']>>>;
  lists?: Maybe<Array<Maybe<Scalars['ID']>>>;
  members?: Maybe<Array<Maybe<Scalars['ID']>>>;
  name?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToShoppingList: ShoppingList;
  checkItemInShoppingList: ShoppingList;
  createFamily: Family;
  createShoppingList: ShoppingList;
  deleteFamily: Family;
  deleteShoppingList: ShoppingList;
  familyInviteResponse: Family;
  inviteToFamily: Family;
  logIn: Scalars['String'];
  removeFamilyMember: Family;
  removeItemFromShoppingList: ShoppingList;
  signUp: Scalars['String'];
  updateFamily: Family;
  updateItemInShoppingList: ShoppingList;
  updateShoppingList: ShoppingList;
  updateUser: User;
};


export type MutationAddItemToShoppingListArgs = {
  checked: Scalars['Boolean'];
  listId: Scalars['ID'];
  name: Scalars['String'];
  quantity: Scalars['Int'];
};


export type MutationCheckItemInShoppingListArgs = {
  checked: Scalars['Boolean'];
  listId: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationCreateFamilyArgs = {
  avatar_url?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateShoppingListArgs = {
  description?: InputMaybe<Scalars['String']>;
  familyId: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationDeleteFamilyArgs = {
  familyId: Scalars['ID'];
};


export type MutationDeleteShoppingListArgs = {
  listId: Scalars['ID'];
};


export type MutationFamilyInviteResponseArgs = {
  accept: Scalars['Boolean'];
  familyId: Scalars['ID'];
};


export type MutationInviteToFamilyArgs = {
  familyId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationLogInArgs = {
  email?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveFamilyMemberArgs = {
  familyId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationRemoveItemFromShoppingListArgs = {
  listId: Scalars['ID'];
  name: Scalars['String'];
};


export type MutationSignUpArgs = {
  avatar_url?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateFamilyArgs = {
  avatar_url?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  familyId: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateItemInShoppingListArgs = {
  checked?: InputMaybe<Scalars['Boolean']>;
  currentName: Scalars['String'];
  listId: Scalars['ID'];
  newName?: InputMaybe<Scalars['String']>;
  quantity?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateShoppingListArgs = {
  description?: InputMaybe<Scalars['String']>;
  listId: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<User>;
  currentUserFamilies?: Maybe<Array<Maybe<Family>>>;
  families?: Maybe<Array<Maybe<Family>>>;
  family?: Maybe<Family>;
  familyLists?: Maybe<Array<Maybe<ShoppingList>>>;
  shoppingList?: Maybe<ShoppingList>;
  userFamilies?: Maybe<Array<Maybe<Family>>>;
  userInvites?: Maybe<Array<Maybe<Family>>>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QueryFamilyArgs = {
  _id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
};


export type QueryFamilyListsArgs = {
  familyId: Scalars['ID'];
};


export type QueryShoppingListArgs = {
  _id: Scalars['ID'];
};


export type QueryUserFamiliesArgs = {
  userId: Scalars['ID'];
};

export type ShoppingItem = {
  __typename?: 'ShoppingItem';
  checked?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  quantity?: Maybe<Scalars['Int']>;
};

export type ShoppingList = {
  __typename?: 'ShoppingList';
  _id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  familyId?: Maybe<Scalars['ID']>;
  items?: Maybe<Array<Maybe<ShoppingItem>>>;
  name?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  avatar_url?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  last_name?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Family: ResolverTypeWrapper<Family>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ShoppingItem: ResolverTypeWrapper<ShoppingItem>;
  ShoppingList: ResolverTypeWrapper<ShoppingList>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Family: Family;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  ShoppingItem: ShoppingItem;
  ShoppingList: ShoppingList;
  String: Scalars['String'];
  User: User;
}>;

export type FamilyResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Family'] = ResolversParentTypes['Family']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  avatar_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  creator?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  invites?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  lists?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addItemToShoppingList?: Resolver<ResolversTypes['ShoppingList'], ParentType, ContextType, RequireFields<MutationAddItemToShoppingListArgs, 'checked' | 'listId' | 'name' | 'quantity'>>;
  checkItemInShoppingList?: Resolver<ResolversTypes['ShoppingList'], ParentType, ContextType, RequireFields<MutationCheckItemInShoppingListArgs, 'checked' | 'listId' | 'name'>>;
  createFamily?: Resolver<ResolversTypes['Family'], ParentType, ContextType, RequireFields<MutationCreateFamilyArgs, 'name'>>;
  createShoppingList?: Resolver<ResolversTypes['ShoppingList'], ParentType, ContextType, RequireFields<MutationCreateShoppingListArgs, 'familyId' | 'name'>>;
  deleteFamily?: Resolver<ResolversTypes['Family'], ParentType, ContextType, RequireFields<MutationDeleteFamilyArgs, 'familyId'>>;
  deleteShoppingList?: Resolver<ResolversTypes['ShoppingList'], ParentType, ContextType, RequireFields<MutationDeleteShoppingListArgs, 'listId'>>;
  familyInviteResponse?: Resolver<ResolversTypes['Family'], ParentType, ContextType, RequireFields<MutationFamilyInviteResponseArgs, 'accept' | 'familyId'>>;
  inviteToFamily?: Resolver<ResolversTypes['Family'], ParentType, ContextType, RequireFields<MutationInviteToFamilyArgs, 'familyId' | 'userId'>>;
  logIn?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationLogInArgs, 'password'>>;
  removeFamilyMember?: Resolver<ResolversTypes['Family'], ParentType, ContextType, RequireFields<MutationRemoveFamilyMemberArgs, 'familyId' | 'userId'>>;
  removeItemFromShoppingList?: Resolver<ResolversTypes['ShoppingList'], ParentType, ContextType, RequireFields<MutationRemoveItemFromShoppingListArgs, 'listId' | 'name'>>;
  signUp?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'email' | 'password' | 'username'>>;
  updateFamily?: Resolver<ResolversTypes['Family'], ParentType, ContextType, RequireFields<MutationUpdateFamilyArgs, 'familyId'>>;
  updateItemInShoppingList?: Resolver<ResolversTypes['ShoppingList'], ParentType, ContextType, RequireFields<MutationUpdateItemInShoppingListArgs, 'currentName' | 'listId'>>;
  updateShoppingList?: Resolver<ResolversTypes['ShoppingList'], ParentType, ContextType, RequireFields<MutationUpdateShoppingListArgs, 'listId'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
}>;

export type QueryResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  currentUserFamilies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Family']>>>, ParentType, ContextType>;
  families?: Resolver<Maybe<Array<Maybe<ResolversTypes['Family']>>>, ParentType, ContextType>;
  family?: Resolver<Maybe<ResolversTypes['Family']>, ParentType, ContextType, Partial<QueryFamilyArgs>>;
  familyLists?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShoppingList']>>>, ParentType, ContextType, RequireFields<QueryFamilyListsArgs, 'familyId'>>;
  shoppingList?: Resolver<Maybe<ResolversTypes['ShoppingList']>, ParentType, ContextType, RequireFields<QueryShoppingListArgs, '_id'>>;
  userFamilies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Family']>>>, ParentType, ContextType, RequireFields<QueryUserFamiliesArgs, 'userId'>>;
  userInvites?: Resolver<Maybe<Array<Maybe<ResolversTypes['Family']>>>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
}>;

export type ShoppingItemResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ShoppingItem'] = ResolversParentTypes['ShoppingItem']> = ResolversObject<{
  checked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  quantity?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ShoppingListResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['ShoppingList'] = ResolversParentTypes['ShoppingList']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  familyId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  items?: Resolver<Maybe<Array<Maybe<ResolversTypes['ShoppingItem']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = ServerContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  avatar_url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  first_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  last_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ServerContext> = ResolversObject<{
  Family?: FamilyResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ShoppingItem?: ShoppingItemResolvers<ContextType>;
  ShoppingList?: ShoppingListResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

