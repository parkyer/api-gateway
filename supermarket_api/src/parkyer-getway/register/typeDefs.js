
export const registerTypeDef = `
  type Register {
    Id: String!
    User: Int!
    ParkingId: Int!
    Type: String!
    Date: String!
    
}
input RegisterInput {
    user: Int!
    parkingId: Int!
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
    deleteRegister(id: String!):Boolean
`;
