import { model, ObjectId, PopulatedDoc, Schema } from 'mongoose';

export interface FamilyDocument {
  _id: ObjectId;
  name: string
  creator: ObjectId
  members: ObjectId[]
  lists: ObjectId[]
  invites: ObjectId[]
  description?: string
  avatar_url?: string
}

const FamilySchema = new Schema<FamilyDocument>({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    members: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    lists: [{
        type: Schema.Types.ObjectId,
        ref: 'ShoppingList',
        required: true
    }],
    invites: {
        type: [Schema.Types.ObjectId],
        required: true
    },
    description: {
        type: String,
        required: false
    },
    avatar_url: {
        type: String,
        required: false
    }   
}, {
  // Assigns createdAt and updatedAt fields with a Date type
  timestamps: true
})

const FamilyModel = model<FamilyDocument>('family', FamilySchema)
export default FamilyModel