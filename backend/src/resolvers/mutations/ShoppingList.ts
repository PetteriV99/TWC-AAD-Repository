/*
  ShoppingList Mutations
*/
export default {
  createShoppingList: async (_, { familyId, name, description }, { dataSources, user }) => {
    if (!user) {
      throw new Error('You must be logged in to create a shopping list');
    }

    const family = await dataSources.families.getFamily({_id: familyId});
    if (!family) {
      throw new Error('Family not found');
    }

    if (family.creator.toString() !== user.id && family.members.indexOf(user.id) === -1) {
      throw new Error('You are not authorized to create a shopping list for this family');
    }

    const newList = await dataSources.shoppingLists.createShoppingList({ familyId, name, description });
    await dataSources.families.updateFamily(familyId, { lists: [ ...family.lists, newList._id ] });
    return newList;
  },

  updateShoppingList: async (_, { listId, name, description }, { dataSources, user }) => {
    if (!user) {
      throw new Error('You must be logged in to update a shopping list');
    }

    const shoppingList = await dataSources.shoppingLists.getShoppingList(listId);
    if (!shoppingList) {
      throw new Error('Shopping list not found');
    }

    const family = await dataSources.families.getFamily({_id: shoppingList.familyId});
    if (!family) {
      throw new Error('Family not found');
    }

    if (family.creator.toString() !== user.id && family.members.indexOf(user.id) === -1) {
      throw new Error('You are not authorized to create a shopping list for this family');
    }

    return dataSources.shoppingLists.updateShoppingList(listId, { name, description });
  },

  deleteShoppingList: async (_, { listId }, { dataSources, user }) => {
    if (!user) {
      throw new Error('You must be logged in to delete a shopping list');
    }

    const shoppingList = await dataSources.shoppingLists.getShoppingList(listId);
    if (!shoppingList) {
      throw new Error('Shopping list not found');
    }

    const family = await dataSources.families.getFamily({_id: shoppingList.familyId});
    if (!family) {
      throw new Error('Family not found');
    }

    if (family.creator.toString() !== user.id && family.members.indexOf(user.id) === -1) {
      throw new Error('You are not authorized to create a shopping list for this family');
    }

    return dataSources.shoppingLists.deleteShoppingList(listId);
  },


  addItemToShoppingList: async (_, { listId, name, quantity, checked }, { dataSources, user }) => {
    if (!user) {
      throw new Error('You must be logged in to add an item to a shopping list');
    }

    const shoppingList = await dataSources.shoppingLists.getShoppingList(listId);
    if (!shoppingList) {
      throw new Error('Shopping list not found');
    }

    const family = await dataSources.families.getFamily({_id: shoppingList.familyId});
    if (!family) {
      throw new Error('Family not found');
    }

    if (family.creator.toString() !== user.id && family.members.indexOf(user.id) === -1) {
      throw new Error('You are not authorized to create a shopping list for this family');
    }

    return dataSources.shoppingLists.addItemToShoppingList(listId, { name, quantity, checked });
  },

  updateItemInShoppingList: async (_, { listId, currentName, newName, quantity, checked }, { dataSources, user }) => {
    if (!user) {
      throw new Error('You must be logged in to update an item in a shopping list');
    }

    const shoppingList = await dataSources.shoppingLists.getShoppingList(listId);
    if (!shoppingList) {
      throw new Error('Shopping list not found');
    }

    const family = await dataSources.families.getFamily({_id: shoppingList.familyId});
    if (!family) {
      throw new Error('Family not found');
    }

    if (family.creator.toString() !== user.id && family.members.indexOf(user.id) === -1) {
      throw new Error('You are not authorized to create a shopping list for this family');
    }

    return dataSources.shoppingLists.updateItemInShoppingList(listId, currentName, { name: newName, quantity, checked });
  },

  removeItemFromShoppingList: async (_, { listId, name }, { dataSources, user }) => {
    if (!user) {
      throw new Error('You must be logged in to delete an item from a shopping list');
    }

    const shoppingList = await dataSources.shoppingLists.getShoppingList(listId);
    if (!shoppingList) {
      throw new Error('Shopping list not found');
    }

    const family = await dataSources.families.getFamily({_id: shoppingList.familyId});
    if (!family) {
      throw new Error('Family not found');
    }

    if (family.creator.toString() !== user.id && family.members.indexOf(user.id) === -1) {
      throw new Error('You are not authorized to create a shopping list for this family');
    }

    return dataSources.shoppingLists.removeItemFromShoppingList(listId, name);
  },

  checkItemInShoppingList: async (_, { listId, name, checked }, { dataSources, user }) => {
    if (!user) {
      throw new Error('You must be logged in to check an item in a shopping list');
    }

    const shoppingList = await dataSources.shoppingLists.getShoppingList(listId);
    if (!shoppingList) {
      throw new Error('Shopping list not found');
    }

    const family = await dataSources.families.getFamily({_id: shoppingList.familyId});
    if (!family) {
      throw new Error('Family not found');
    }

    if (family.creator.toString() !== user.id && family.members.indexOf(user.id) === -1) {
      throw new Error('You are not authorized to create a shopping list for this family');
    }

    return dataSources.shoppingLists.checkItemInShoppingList(listId, name, checked);
  },
    
}