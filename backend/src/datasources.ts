// Use our automatically generated Book and AddBookMutationResponse types
// for type safety in our data source class
import { AddFamilyMutationResponse, Family } from './__generated__/resolvers-types';

export class ShoppingDataSource {
  // Our example static data set
  families: { name?: string;}[] = [
    {
      name: 'The Awakening'
    },
    {
      name: 'City of Glass'
    },
  ];

  getFamilies(): Family[] {
    // simulate fetching a list of books
    return this.families;
  }

  // We are using a static data set for this small example, but normally
  // this Mutation would *mutate* our underlying data using a database
  // or a REST API.
  async addFamily(family: Family): Promise<AddFamilyMutationResponse> {
    this.families.push(family);
    console.log(this.families);

    return {
      code: '200',
      success: true,
      message: 'New family added!',
      family: this.families[this.families.length - 1],
    };
  }
}
