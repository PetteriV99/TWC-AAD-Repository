import { model, ObjectId, Schema } from 'mongoose';

export interface ShoppingItem {
  name: string;
  quantity: number;
  checked: boolean;
}

export interface ShoppingListDocument {
  _id: ObjectId;
  familyId: ObjectId;
  name: string
  description: string
  items: ShoppingItem[]
}

const ShoppingListSchema = new Schema<ShoppingListDocument>({
  familyId: {type: Schema.Types.ObjectId, ref: 'Family', required: true},
  name: {type: String, required: true},
  description: {type: String},
  items: [{
    type: Object,
    required: true
  }]
}, {
  // Assigns createdAt and updatedAt fields with a Date type
  timestamps: true
})

const ShoppingListModal = model<ShoppingListDocument>('ShoppingList', ShoppingListSchema)
export default ShoppingListModal