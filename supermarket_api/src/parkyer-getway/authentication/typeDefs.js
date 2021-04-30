export const authenticationTypeDef = `
type UserLogin {
    id: Int!
    name: String!
    last_name: String!
    email: String!
    password: String!
    phone: Int!
    payment_method: Int!
    address: String!
}
type Login {
    access: String!
    id: Int!
}
input UserInputLogin {
    name: String!
    last_name: String!
    email: String!
    password: String!
    phone: Int!
    payment_method: Int!
    address: String!
}
input LoginInput {
    email: String!
    password: String!
}
`;


export const authenticationQueries = `

`;


export const authenticationMutations = `
    crearUsuario(usuario: UserInputLogin!): UserLogin!
    iniciarSesion(login: LoginInput!): Login!
`;