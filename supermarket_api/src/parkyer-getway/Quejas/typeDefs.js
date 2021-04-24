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
	id_parkyer: Int!
}
 type InsertedID{
    InsertedID: String!
 }
type Calificacion{
    _id: String!
    calificacion: Float!
}
input QuejaInput {
	Queja_user: String!         
	ID_Parkyer: Int!
}
input CalificacionInput {
    calificacion: Float!
}
`;

export const quejasQueries = `
    getQueja(id: String!): Queja!
    getQuejas: [Queja]!
    getCalificacion(id: String!): Calificacion!
`;



export const quejasMutations = `
    createQueja(queja: QuejaInput!): InsertedID!
    createCalificacion(calificacion: CalificacionInput!): InsertedID!
`;
