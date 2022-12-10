import ShoppingListModal, { ShoppingItem, ShoppingListDocument } from "../models/ShoppingList";

export default class ShoppingListDataSource {
  private model: typeof ShoppingListModal;

  constructor(model: typeof ShoppingListModal) {
    this.model = model;
  }
  
  async getShoppingList(shoppingListId: string) {
    const foundList = await this.model.findById(shoppingListId);
    return foundList;
  };

  // Mutations
  async createShoppingList({ familyId, name, description }: Pick<ShoppingListDocument, 'familyId' | 'name' | 'description' >) {
    const newShoppingList = new this.model({
      familyId,
      name,
      description,
    });

    const savedShoppingList = await newShoppingList.save();
    return savedShoppingList;
  };

  async updateShoppingList(shoppingListId: string, { name, description }: Pick<ShoppingListDocument, 'name' | 'description' >) {
    const updatedShoppingList = await this.model.findOneAndUpdate(
      { _id: shoppingListId },
      { name, description },
      { new: true }
    );
    return updatedShoppingList;
  };

  async deleteShoppingList(shoppingListId: string) {
    const deletedShoppingList = await this.model.findOneAndDelete(
      { _id: shoppingListId }
    );
    return deletedShoppingList;
  };

  async addItemToShoppingList(shoppingListId: string, item: ShoppingItem) {
    const updatedShoppingList = await this.model.findOneAndUpdate(
      { _id: shoppingListId },
      { $addToSet: { items: item } },
      { new: true }
    );
    return updatedShoppingList;
  };

  async removeItemFromShoppingList(shoppingListId: string, itemName: string) {
    const updatedShoppingList = await this.model.findOneAndUpdate(
      { _id: shoppingListId },
      { $pull: { items: { name: itemName } } },
      { new: true }
    );
    return updatedShoppingList;
  };

  async updateItemInShoppingList(shoppingListId: string, currentName: string, item: ShoppingItem) {
    const updatedShoppingList = await this.model.findOneAndUpdate(
      { _id: shoppingListId, "items.name": currentName },
      { $set: { "items.$": item } },
      { new: true }
    );
    return updatedShoppingList;
  }

  async checkItemInShoppingList(shoppingListId: string, itemName: string, checked: boolean) {
    const updatedShoppingList = await this.model.findOneAndUpdate(
      { _id: shoppingListId, "items.name": itemName },
      { $set: { "items.$.checked": checked } },
      { new: true }
    );
    return updatedShoppingList;
  }
}