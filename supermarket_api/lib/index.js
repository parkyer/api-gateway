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

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		profileTypeDef
	],
	[
		profileQueries
	],
	[
		profileMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		resolvers
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
