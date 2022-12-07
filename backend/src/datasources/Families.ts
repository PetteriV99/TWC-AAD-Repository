import FamilyModel, { FamilyDocument } from '../models/FamilyModel';
import { UserDocument } from '../models/UserModel';

export default class FamilyDataSource {
  private model: typeof FamilyModel;

  constructor(model: typeof FamilyModel) {
    this.model = model;
  }

  async getFamilies() {
    // Could populate creator, members, invites and lists here
    return await this.model.find().populate('creator');
  }

  async getFamily({_id, name}: Pick<FamilyDocument, '_id' | 'name'>) {
    // Could populate creator, members, invites and lists here
    const foundFamily = await this.model.findOne({
      $or: [{_id}, {name}]
    });
    return foundFamily;
  }

  async createFamily({ name, creator, description, avatar_url}: Pick<FamilyDocument, 'name' | 'creator' | 'description' | 'avatar_url'>) {
    const newFamily = new this.model({
      name,
      creator,
      description,
      avatar_url
    });

    const savedFamily = await newFamily.save();
    return savedFamily;
  }

  async updateFamily(familyId: string, { name, description, avatar_url}: Pick<FamilyDocument, 'name' | 'description' | 'avatar_url'>) {
    const updatedFamily = await this.model.findOneAndUpdate(
      { _id: familyId },
      { name, description, avatar_url },
      { new: true }
    );
    return updatedFamily;
  }

  async deleteFamily(familyId: string) {
    const deletedFamily = await this.model.findOneAndDelete(
      { _id: familyId }
    );
    return deletedFamily;
  }

  // INVITES
  async inviteToFamily(familyId: string, userId: string) {
    const updatedFamily = await this.model.findOneAndUpdate(
      { _id: familyId },
      { $addToSet: { invites: userId } },
      { new: true }
    );
    return updatedFamily;
  }

  async familyInviteResponse(familyId: string, userId: string, accept: boolean) {
    const updatedFamily = await this.model.findOneAndUpdate(
      { _id: familyId },
      { $pull: { invites: userId } },
      { new: true }
    );

    if (accept) {
      return await this.model.findOneAndUpdate(
        { _id: familyId },
        { $addToSet: { members: userId } },
        { new: true }
      );
    }

    return updatedFamily;
  }

  async removeFamilyMember(familyId: string, userId: string) {
    const updatedFamily = await this.model.findOneAndUpdate(
      { _id: familyId },
      { $pull: { members: userId } },
      { new: true }
    );
    return updatedFamily;
  }
  
}