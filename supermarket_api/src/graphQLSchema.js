import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

import {
	profileMutations,
	profileQueries,
	profileTypeDef
} from './parkyer-getway/profile/typeDefs';
import {
	quejasMutations,
	quejasQueries,
	quejasTypeDef
} from './parkyer-getway/Quejas/typeDefs';
import {
	registerMutations,
	registerQueries,
	registerTypeDef
} from './parkyer-getway/register/typeDefs';
import {
	vehicleMutations,
	vehicleQueries,
	vehicleTypeDef
} from './parkyer-getway/vehicles/typeDefs';
import {
	contactoMutations,
	contactoQueries,
	contactoTypeDef
} from './parkyer-getway/contacto/typeDefs';
import {
	admin2Mutations,
	admin2Queries,
	admin2TypeDef
} from './parkyer-getway/administration_two/typeDefs';
import {
	authenticationMutations,
	authenticationQueries,
	authenticationTypeDef
} from './parkyer-getway/authentication/typeDefs';

import categoryResolvers from './parkyer-getway/profile/resolvers';
import QuejasResolvers from './parkyer-getway/Quejas/resolvers';
import RegisterResolvers from './parkyer-getway/register/resolvers';
import vehicleResolvers from './parkyer-getway/vehicles/resolvers';
import contactoResolvers from './parkyer-getway/contacto/resolvers';
import admin2Resolvers from './parkyer-getway/administration_two/resolvers';
import authenticationResolvers from './parkyer-getway/authentication/resolvers';

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
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		QuejasResolvers,
		RegisterResolvers,
		vehicleResolvers,
		contactoResolvers,
		admin2Resolvers,
		authenticationResolvers
	)
});
