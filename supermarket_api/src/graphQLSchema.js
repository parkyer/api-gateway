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

import categoryResolvers from './parkyer-getway/profile/resolvers';
import QuejasResolvers from './parkyer-getway/Quejas/resolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		profileTypeDef,
		quejasTypeDef
	],
	[
		profileQueries,
		quejasQueries
	],
	[
		profileMutations,
		quejasMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		categoryResolvers,
		QuejasResolvers
	)
});
