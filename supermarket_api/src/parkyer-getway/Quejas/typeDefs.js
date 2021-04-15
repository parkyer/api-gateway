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

  export const quejasTypeDef =  `
  type Queja {
    _id: String!
	queja_user: String!           
	calificacion: Float!           
	id_parkyer: Int!
}
 type InsertedID{
    InsertedID: String!
 }
input QuejaInput {
	Queja_user: String!           
	Calificacion: Float!           
	ID_Parkyer: Int!
}
`;

export const quejasQueries = `
    getQueja(id: String!): Queja!
    getQuejas: [Queja]!
`;



export const quejasMutations = `
    createQueja(queja: QuejaInput!): InsertedID!  
`;
