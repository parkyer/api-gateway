/*export const profileTypeDef = `
  type Category {
      id: Int!
      name: String!
      description: String!
  }
  input CategoryInput {
      name: String!
      description: String!
  }`;*/

  export const vehicleTypeDef =  `
  type Vehicle {
    id: Int!
    id_client: Int!
    tipo: String!
    tamano: String!
    descripcion: String!
  }`;

/*export const profileQueries = `
      allCategories: [User]!
      categoryById(id: Int!): Category!
  `;
*/
export const vehicleQueries = `
    getVehicle: [Vehicle]!
`;

/*export const profileMutations = `
    createCategory(category: CategoryInput!): Category!
    updateCategory(id: Int!, category: CategoryInput!): Category!
    deleteCategory(id: Int!): Int
`;*/

/*export const vehicleMutations = `
    createUser(user: UserInput!): User!
    updateUser(id: Int!, user: EditUser!): User!
    changePassword(id: Int!, password: PasswordInput!): User!
    addPaymentMethod(id: Int!, payment: PaymentInput!): User!
    deleteUser(id: Int!): User!
`;*/

export const vehicleMutations = `
    
`;