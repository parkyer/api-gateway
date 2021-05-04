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
  }
  input VehicleInput {
	id_client: Int!           
	tipo: String!           
	tamano: String!
    descripcion: String!
}
input EditVehicle {          
	tipo: String!           
	tamano: String!
    descripcion: String!
}
  `;

export const vehicleQueries = `
    getAllVehicles: [Vehicle]!
    getVehicle(id: Int!): [Vehicle]!
`;

export const vehicleMutations = `
    createVehicle(vehicle: VehicleInput!): Vehicle!
    updateVehicle(id: Int!, vehicle: EditVehicle!): Vehicle!
    deleteVehicle(id: Int!): Int
`;
