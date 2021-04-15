export const contactoTypeDef = `
  type MensajeRecibido {
    mensaje: String!
}
type Users {
    mensaje: String!
    idmensaje: Int!
    id_usuario: Int!
    tipo: String!
}
input Usuario {
    mensaje: String!
    idmensaje: Int!
    id_usuario: Int!
    tipo: String!
}
`;


export const contactoQueries = `
    getInicio: [Users]!
`;


export const contactoMutations = `
    crearMensaje(mensaje: Usuario!): MensajeRecibido!
`;