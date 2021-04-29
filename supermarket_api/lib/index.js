'use strict';

var Koa = require('koa');
var KoaRouter = require('koa-router');
var koaLogger = require('koa-logger');
var koaBody = require('koa-bodyparser');
var koaCors = require('@koa/cors');
var apolloServerKoa = require('apollo-server-koa');
var merge = require('lodash.merge');
var GraphQLJSON = require('graphql-type-json');
var graphqlTools = require('graphql-tools');
var request = require('request-promise-native');
var graphql$1 = require('graphql');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Koa__default = /*#__PURE__*/_interopDefaultLegacy(Koa);
var KoaRouter__default = /*#__PURE__*/_interopDefaultLegacy(KoaRouter);
var koaLogger__default = /*#__PURE__*/_interopDefaultLegacy(koaLogger);
var koaBody__default = /*#__PURE__*/_interopDefaultLegacy(koaBody);
var koaCors__default = /*#__PURE__*/_interopDefaultLegacy(koaCors);
var merge__default = /*#__PURE__*/_interopDefaultLegacy(merge);
var GraphQLJSON__default = /*#__PURE__*/_interopDefaultLegacy(GraphQLJSON);
var request__default = /*#__PURE__*/_interopDefaultLegacy(request);

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
		return await request__default['default'](parameters);
	} catch (err) {
		return err;
	}
}

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
	const data = graphql$1.formatError(error);
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
    getRegisterUser(user: Int!):[Register]!
    getRegisterParking(parkingId: Int!):[Register]!
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

const authenticationTypeDef = `
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


const authenticationQueries = `

`;


const authenticationMutations = `
    crearUsuario(usuario: UserInputLogin!): UserLogin!
    iniciarSesion(login: LoginInput!): Login!
`;

const url$6 = '35.226.48.188';
const port$6 = '4000';

const URL$6 = `http://${url$6}:${port$6}`;
const ADD_USER$1='add_user';
const EDIT_USER='edit_user';
const GET_USER='get_user';
const CHANGE_PASSWORD='change_password';
const PAYMENT_METHOD='add_payment_method';
const DELETE_USER='delete_user';
//const ADD_AVATAR='add_avatar';
//const GET_AVATAR='get_avatar';


const resolvers$6 = {
	Query: {
		//CUSTOM ENDPONTS
		getUser:(_, { id })=> //endpoint para traer usuario
			generalRequest(`${URL$6}/${GET_USER}/${id}`, 'GET'),

		//EXAMPLE ENDPOINTS
		/*allCategories: (_) =>
			getRequest(URL, ''),
		categoryById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),*/
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createUser:(_, {user})=>
			generalRequest(`${URL$6}/${ADD_USER$1}`,'POST',user),//endpoint para crear usuario
		updateUser:(_,{id, user})=>
			generalRequest(`${URL$6}/${EDIT_USER}/${id}`, 'PUT', user), //endpoint para editar usuario
		changePassword:(_,{id,password})=>
			generalRequest(`${URL$6}/${CHANGE_PASSWORD}/${id}`, 'PUT', password), //endpoint para cambiar la contraseña
		addPaymentMethod:(_,{id,payment})=>
			generalRequest(`${URL$6}/${PAYMENT_METHOD}/${id}`, 'PUT',payment), //endpoint para cambiar metodo de pago
		deleteUser:(_,{ id })=>
			generalRequest(`${URL$6}/${DELETE_USER}/${id}`, 'DELETE'),//endpoint para borrar usuario
		
			//EXAMPLE ENDPOINTS
		/*createCategory: (_, { category }) =>
			generalRequest(`${URL}/`, 'POST', category),
		updateCategory: (_, { id, category }) =>
			generalRequest(`${URL}/${id}`, 'PUT', category),
		deleteCategory: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')*/
	}
};

const url$5 = '35.226.48.188';
const port$5 = '4001';

const URL$5 = `http://${url$5}:${port$5}`;
const GET_QUEJA='queja';
const ADD_QUEJA='queja';
const GET_QUEJAS='quejas';
const GET_CALIFICACIONES='calificaciones';
const ADD_CALIFICACION='calificacion';




const resolvers$5 = {
	Query: {
		//CUSTOM ENDPONTS
		getQueja:(_, { id })=> //endpoint para traer queja
			generalRequest(`${URL$5}/${GET_QUEJA}/${id}`, 'GET'),
		getQuejas:(_)=> //endpoint para traer quejas
			generalRequest(`${URL$5}/${GET_QUEJAS}`, 'GET'),
		getCalificacion:(_, { id })=> //endpoint para traer queja
			generalRequest(`${URL$5}/${GET_CALIFICACIONES}/${id}`, 'GET'),				
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createQueja:(_, {queja})=>
			generalRequest(`${URL$5}/${ADD_QUEJA}`,'POST',queja),//endpoint para crear queja
		createCalificacion:(_, {calificacion})=>
			generalRequest(`${URL$5}/${ADD_CALIFICACION}`,'POST',calificacion),//endpoint para crear queja
	}
};

const url$4 = '54.237.253.183';
const port$4 = '55441';
const entryPoint = 'api/Registers';

const URL$4 = `http://${url$4}:${port$4}/${entryPoint}`;
//const ADD_AVATAR='add_avatar';
//const GET_AVATAR='get_avatar';



const resolvers$4 = {
	Query: {
		//CUSTOM ENDPONTS
		getRegister:(_, { id })=> //endpoint para traer registros
			generalRequest(`${URL$4}/Get/${id}`, 'GET'),
		
		getRegisterUser:(_, { user })=> //endpoint para traer usuario
			generalRequest(`${URL$4}/GetUser/${user}`, 'GET'),
		
		getRegisterParking:(_, { parkingId })=> //endpoint para traer usuario
			generalRequest(`${URL$4}/GetParking/${parkingId}`, 'GET'),
			
		get_Registers: (_) =>
		generalRequest(URL$4, 'GET'),
		
	
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createRegister:(_, {Register})=>
			generalRequest(`${URL$4}`,'POST',Register),//endpoint para crear registro
		deleteRegister:(_,{ id })=>
			generalRequest(`${URL$4}/${id}`, 'DELETE'),//endpoint para borrar registro
		
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

const url$2 = '18.216.208.246';
const port$2 = '8080';

const URL$2 = `http://${url$2}:${port$2}`;
const Inicio='inicio';
const Contacto='contacto';


const resolvers$2 = {
	Query: {
		//CUSTOM ENDPONTS
		getInicio:(_)=> //endpoint para traer registros
			generalRequest(`${URL$2}/${Inicio}`, 'GET'),
		
	
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		crearMensaje:(_, {mensaje})=>
			generalRequest(`${URL$2}/${Contacto}`,'POST',mensaje),//endpoint para crear usuario
	}
};

const url$1 = '3.221.87.48';
const port$1 = '8080';

const URL$1 = `http://${url$1}:${port$1}`;
const GET_PARKINGS='parkings';
const GET_PARKINGSUSED='parkingsusedby';
const NEW='newsuscription';
const DELETE='deletesuscription';
const GET_AVAILABLE='availableparkings';

const resolvers$1 = {
	Query: {
		//CUSTOM ENDPONTS
		getParkings:(_)=> 
			generalRequest(`${URL$1}/${GET_PARKINGS}`, 'GET'),

		getParkingsUsedBy:(_,{ id })=>
			generalRequest(`${URL$1}/${GET_PARKINGSUSED}/${id}`, 'GET'),

		getAvailableParkings:(_)=> 
			generalRequest(`${URL$1}/${GET_AVAILABLE}`, 'GET'),
		
	},
	
	Mutation: {
		//CUSTOM ENDPONTS
		newSuscription:(_, {id, client})=>
			generalRequest(`${URL$1}/${NEW}/${id}`,'PUT', client),
		deleteSuscription:(_,{id})=>
			generalRequest(`${URL$1}/${DELETE}/${id}`, 'PUT'),
	}
};

const url = '35.226.48.188';
const port = '4002';

const URL = `http://${url}:${port}`;
const ADD_USER='add_user';
const LOGIN='login';

const resolvers = {
	Query: {
		//CUSTOM ENDPONTS
	},
	Mutation: {
		//CUSTOM ENDPONTS
		crearUsuario:(_, {usuario})=>
			generalRequest(`${URL}/${ADD_USER}`,'POST',usuario),//endpoint para crear usuario
        iniciarSesion:(_,{login})=>
            generalRequest(`${URL}/${LOGIN}`,'POST',login)
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
		admin2TypeDef,
		authenticationTypeDef
	],
	[
		profileQueries,
		registerQueries,
		quejasQueries,
		vehicleQueries,
		contactoQueries,
		admin2Queries,
		authenticationQueries
	],
	[
		profileMutations,
		quejasMutations,
		registerMutations,
		vehicleMutations,
		contactoMutations,
		admin2Mutations,
		authenticationMutations
	]
);


// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge__default['default'](
		{ JSON: GraphQLJSON__default['default'] }, // allows scalar JSON
		resolvers$6,
		resolvers$5,
		resolvers$4,
		resolvers$3,
		resolvers$2,
		resolvers$1,
		resolvers
	)
});

const app = new Koa__default['default']();
const router = new KoaRouter__default['default']();
const PORT = process.env.PORT || 5000;

app.use(koaLogger__default['default']());
app.use(koaCors__default['default']());

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
const graphql = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody__default['default'](), graphql);
router.get('/graphql', graphql);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
