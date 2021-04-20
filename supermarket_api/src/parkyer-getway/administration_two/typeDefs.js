  export const admin2TypeDef =  `

type Parking {
    id: Int!
    id_owner: Int!
    id_client: String!
    latitude: String!
    longitude: String!
    location: String!
    type: String!    
}
input clienteInput {
    id_client: String!
}`;

export const admin2Queries = `
    getParkings:[Parking]!
    getParkingsUsedBy(id: Int!):[Parking]!
    getAvailableParkings:[Parking]!
`;

export const admin2Mutations = `
    newSuscription(id: Int!, client: clienteInput!): Parking!
    deleteSuscription(id: Int!): Parking!
`;