'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */


/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */


/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

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

  const profileTypeDef =  `
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
const profileQueries = `
    getUser(id: Int!): User!
`;

/*export const profileMutations = `
    createCategory(category: CategoryInput!): Category!
    updateCategory(id: Int!, category: CategoryInput!): Category!
    deleteCategory(id: Int!): Int
`;*/

const profileMutations = `
    createUser(user: UserInput!): User!
    updateUser(id: Int!, user: EditUser!): User!
    changePassword(id: Int!, password: PasswordInput!): User!
    addPaymentMethod(id: Int!, payment: PaymentInput!): User!
    deleteUser(id: Int!): User!
`;

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

  const quejasTypeDef =  `
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

const quejasQueries = `
    getQueja(id: String!): Queja!
    getQuejas: [Queja]!
    getCalificacion(id: String!): Calificacion!
`;



const quejasMutations = `
    createQueja(queja: QuejaInput!): InsertedID!
    createCalificacion(calificacion: CalificacionInput!): InsertedID!
`;

const registerTypeDef = `
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


const registerQueries = `
    getRegister(id: String!): Register!
    get_Registers:[Register]!
`;


const registerMutations = `
    createRegister(Register: RegisterInput!): Register!
    deleteRegister(id: String!):Boolean
`;

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

  const vehicleTypeDef =  `
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

const vehicleQueries = `
    getAllVehicles: [Vehicle]!
    getVehicle(id: Int!): Vehicle!
`;

const vehicleMutations = `
    createVehicle(vehicle: VehicleInput!): Vehicle!
    updateVehicle(id: Int!, vehicle: EditVehicle!): Vehicle!
    deleteVehicle(id: Int!): Int
`;

const contactoTypeDef = `
  type MensajeRecibido {
    mensaje: String!
}
type Users {
    mensaje: String!
    idmensaje: Int
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


const contactoQueries = `
    getInicio: [Users]!
`;


const contactoMutations = `
    crearMensaje(mensaje: Usuario!): MensajeRecibido!
`;

const admin2TypeDef =  `

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

const admin2Queries = `
    getParkings:[Parking]!
    getParkingsUsedBy(id: Int!):[Parking]!
    getAvailableParkings:[Parking]!
`;

const admin2Mutations = `
    newSuscription(id: Int!, client: clienteInput!): Parking!
    deleteSuscription(id: Int!): Parking!
`;

const url = '35.226.48.188';
const port = '4000';

const URL = `http://${url}:${port}`;
const ADD_USER='add_user';
const EDIT_USER='edit_user';
const GET_USER='get_user';
const CHANGE_PASSWORD='change_password';
const PAYMENT_METHOD='add_payment_method';
const DELETE_USER='delete_user';
//const ADD_AVATAR='add_avatar';
//const GET_AVATAR='get_avatar';


const resolvers = {
	Query: {
		//CUSTOM ENDPONTS
		getUser:(_, { id })=> //endpoint para traer usuario
			generalRequest(`${URL}/${GET_USER}/${id}`, 'GET'),

		//EXAMPLE ENDPOINTS
		/*allCategories: (_) =>
			getRequest(URL, ''),
		categoryById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),*/
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createUser:(_, {user})=>
			generalRequest(`${URL}/${ADD_USER}`,'POST',user),//endpoint para crear usuario
		updateUser:(_,{id, user})=>
			generalRequest(`${URL}/${EDIT_USER}/${id}`, 'PUT', user), //endpoint para editar usuario
		changePassword:(_,{id,password})=>
			generalRequest(`${URL}/${CHANGE_PASSWORD}/${id}`, 'PUT', password), //endpoint para cambiar la contraseña
		addPaymentMethod:(_,{id,payment})=>
			generalRequest(`${URL}/${PAYMENT_METHOD}/${id}`, 'PUT',payment), //endpoint para cambiar metodo de pago
		deleteUser:(_,{ id })=>
			generalRequest(`${URL}/${DELETE_USER}/${id}`, 'DELETE'),//endpoint para borrar usuario
		
			//EXAMPLE ENDPOINTS
		/*createCategory: (_, { category }) =>
			generalRequest(`${URL}/`, 'POST', category),
		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')*/
	}
};

const url$1 = '35.226.48.188';
const port$1 = '4001';

const URL$1 = `http://${url$1}:${port$1}`;
const GET_QUEJA='queja';
const ADD_QUEJA='queja';
const GET_QUEJAS='quejas';
const GET_CALIFICACIONES='calificaciones';
const ADD_CALIFICACION='calificacion';




const resolvers$1 = {
	Query: {
		//CUSTOM ENDPONTS
		getQueja:(_, { id })=> //endpoint para traer queja
			generalRequest(`${URL$1}/${GET_QUEJA}/${id}`, 'GET'),
		getQuejas:(_)=> //endpoint para traer quejas
			generalRequest(`${URL$1}/${GET_QUEJAS}`, 'GET'),
		getCalificacion:(_, { id })=> //endpoint para traer queja
			generalRequest(`${URL$1}/${GET_CALIFICACIONES}/${id}`, 'GET'),				
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createQueja:(_, {queja})=>
			generalRequest(`${URL$1}/${ADD_QUEJA}`,'POST',queja),//endpoint para crear queja
		createCalificacion:(_, {calificacion})=>
			generalRequest(`${URL$1}/${ADD_CALIFICACION}`,'POST',calificacion),//endpoint para crear queja
	}
};

const url$2 = '54.237.253.183';
const port$2 = '55441';
const entryPoint = 'api/Registers';

const URL$2 = `http://${url$2}:${port$2}/${entryPoint}`;
//const ADD_AVATAR='add_avatar';
//const GET_AVATAR='get_avatar';



const resolvers$2 = {
	Query: {
		//CUSTOM ENDPONTS
		getRegister:(_, { id })=> //endpoint para traer usuario
			generalRequest(`${URL$2}/${id}`, 'GET'),

		get_Registers: (_) =>
		generalRequest(URL$2, 'GET'),
		
	
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createRegister:(_, {Register})=>
			generalRequest(`${URL$2}`,'POST',Register),//endpoint para crear usuario
		deleteRegister:(_,{ id })=>
			generalRequest(`${URL$2}/${id}`, 'DELETE'),//endpoint para borrar usuario
		
	}
};

const url$3 = '52.0.246.220';
const port$3 = '3000';

const URL$3 = `http://${url$3}:${port$3}`;
const VEHICLE='vehiculos';
const GET_VEHICLES='vehiculos';
const EDIT_VEHICLE='vehiculos';
const DELETE_VEHICLE='vehiculos';


const resolvers$3 = {
	Query: {
		//CUSTOM ENDPONTS
		getAllVehicles:(_)=> //endpoint para traer usuario
			generalRequest(`${URL$3}/${GET_VEHICLES}`, 'GET'),

		getVehicle:(_, { id })=> //endpoint para traer queja
			generalRequest(`${URL$3}/${VEHICLE}/${id}`, 'GET'),

		//EXAMPLE ENDPOINTS
		/*allCategories: (_) =>
			getRequest(URL, ''),
		categoryById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),*/
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createVehicle:(_, {vehicle})=>
			generalRequest(`${URL$3}/${VEHICLE}`,'POST',vehicle),
		updateVehicle:(_,{id, vehicle})=>
			generalRequest(`${URL$3}/${EDIT_VEHICLE}/${id}`, 'PUT', vehicle),
		deleteVehicle:(_,{ id })=>
			generalRequest(`${URL$3}/${DELETE_VEHICLE}/${id}`, 'DELETE')

			
		/*createUser:(_, {user})=>
			generalRequest(`${URL}/${ADD_USER}`,'POST',user),//endpoint para crear usuario
		updateUser:(_,{id, user})=>
			generalRequest(`${URL}/${EDIT_USER}/${id}`, 'PUT', user), //endpoint para editar usuario
		changePassword:(_,{id,password})=>
			generalRequest(`${URL}/${CHANGE_PASSWORD}/${id}`, 'PUT', password), //endpoint para cambiar la contraseña
		addPaymentMethod:(_,{id,payment})=>
			generalRequest(`${URL}/${PAYMENT_METHOD}/${id}`, 'PUT',payment), //endpoint para cambiar metodo de pago
		deleteUser:(_,{ id })=>
			generalRequest(`${URL}/${DELETE_USER}/${id}`, 'DELETE'),//endpoint para borrar usuario
		*/
			//EXAMPLE ENDPOINTS
		/*createCategory: (_, { category }) =>
			generalRequest(`${URL}/`, 'POST', category),
		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')*/
	}
};

const url$4 = '18.216.208.246';
const port$4 = '8080';

const URL$4 = `http://${url$4}:${port$4}`;
const Inicio='inicio';
const Contacto='contacto';


const resolvers$4 = {
	Query: {
		//CUSTOM ENDPONTS
		getInicio:(_)=> //endpoint para traer registros
			generalRequest(`${URL$4}/${Inicio}`, 'GET'),
		
	
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		crearMensaje:(_, {mensaje})=>
			generalRequest(`${URL$4}/${Contacto}`,'POST',mensaje),//endpoint para crear usuario
	}
};

const url$5 = '3.221.87.48';
const port$5 = '8080';

const URL$5 = `http://${url$5}:${port$5}`;
const GET_PARKINGS='parkings';
const GET_PARKINGSUSED='parkingsusedby';
const NEW='newsuscription';
const DELETE='deletesuscription';
const GET_AVAILABLE='availableparkings';

const resolvers$5 = {
	Query: {
		//CUSTOM ENDPONTS
		getParkings:(_)=> 
			generalRequest(`${URL$5}/${GET_PARKINGS}`, 'GET'),

		getParkingsUsedBy:(_,{ id })=>
			generalRequest(`${URL$5}/${GET_PARKINGSUSED}/${id}`, 'GET'),

		getAvailableParkings:(_)=> 
			generalRequest(`${URL$5}/${GET_AVAILABLE}`, 'GET'),
		
	},
	
	Mutation: {
		//CUSTOM ENDPONTS
		newSuscription:(_, {id, client})=>
			generalRequest(`${URL$5}/${NEW}/${id}`,'PUT', client),
		deleteSuscription:(_,{id})=>
			generalRequest(`${URL$5}/${DELETE}/${id}`, 'PUT'),
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		profileTypeDef,
		quejasTypeDef,
		registerTypeDef,
		vehicleTypeDef,
		contactoTypeDef,
		admin2TypeDef
	],
	[
		profileQueries,
		registerQueries,
		quejasQueries,
		vehicleQueries,
		contactoQueries,
		admin2Queries
	],
	[
		profileMutations,
		quejasMutations,
		registerMutations,
		vehicleMutations,
		contactoMutations,
		admin2Mutations
	]
);


// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers,
		resolvers$1,
		resolvers$2,
		resolvers$3,
		resolvers$4,
		resolvers$5
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
