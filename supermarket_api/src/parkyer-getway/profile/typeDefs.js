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

  export const profileTypeDef =  `
  type User {
    id: Int!
    name: String!
    last_name: String!
    email: String!
    password: String!
    phone: Int!
    payment_method: Int!
    address: String!
}
input UserInput {
    name: String!
    last_name: String!
    email: String!
    password: String!
    phone: Int!
    payment_method: Int!
    address: String!
}
input EditUser{
    name: String!
    last_name: String!
    email: String!
    phone: Int!
    address: String! 
}
input PasswordInput {
    password: String!
}
input PaymentInput {
    payment_method: String!
}`;

/*export const profileQueries = `
      allCategories: [User]!
      categoryById(id: Int!): Category!
  `;
*/
export const profileQueries = `
    getUser(id: Int!): User!
`;

/*export const profileMutations = `
    createCategory(category: CategoryInput!): Category!
    updateCategory(id: Int!, category: CategoryInput!): Category!
    deleteCategory(id: Int!): Int
`;*/

export const profileMutations = `
    createUser(user: UserInput!): User!
    updateUser(id: Int!, user: EditUser!): User!
    changePassword(id: Int!, password: PasswordInput!): User!
    addPaymentMethod(id: Int!, payment: PaymentInput!): User!
    deleteUser(id: Int!): User!
`;
