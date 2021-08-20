export const admin1TypeDef =  `

type Parkinglot {
    id: Int!
    id_owner: Int!
    id_client: String!
    latitude: String!
    longitude: String!
    location: String!
    type: String!
}
input parkinglotInput {
    id_owner: Int!
    id_client: String!
    latitude: String!
    longitude: String!
    location: String!
    type: String!
}
input parkingCreateInput {
    id: Int!
    id_owner: Int!
    id_client: String!
    latitude: String!
    longitude: String!
    location: String!
    type: String! 
}
`;

export const admin1Queries = `
    getParkingsCreated:[Parkinglot]!
    getParkingById(id: Int!):Parkinglot!
    getOwnerParkingLots(id: Int!):[Parkinglot]!
`;

export const admin1Mutations = `
    createParking(parking: parkingCreateInput!):Parkinglot!
    updateParkingById(id: Int!, parking: parkinglotInput!):String!
    deleteParkingById(id: Int!):Int!
`;
