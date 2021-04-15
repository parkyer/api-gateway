export const registerTypeDef = `
  type Register {
    id: String!
    user: Int!
    parkinId: Int!
    type: String!
    date: String!
    
}
input RegisterInput {
    user: Int!
    parkinId: Int!
    type: String!
    date: String!
}
`;


export const registerQueries = `
    getRegister(id: String!): Register!
    get_Registers:[Register]!
`;


export const registerMutations = `
    createRegister(Register: RegisterInput!): Register!
    deleteRegister(id: String!)
`;
