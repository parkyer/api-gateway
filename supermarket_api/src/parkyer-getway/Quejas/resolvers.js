import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}`;
const GET_QUEJA='queja';
const ADD_QUEJA='queja';
const GET_QUEJAS='quejas';




const resolvers = {
	Query: {
		//CUSTOM ENDPONTS
		getQueja:(_, { id })=> //endpoint para traer queja
			generalRequest(`${URL}/${GET_QUEJA}/${id}`, 'GET'),
		getQuejas:(_)=> //endpoint para traer quejas
			generalRequest(`${URL}/${GET_QUEJAS}`, 'GET'),				
	
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createQueja:(_, {queja})=>
			generalRequest(`${URL}/${ADD_QUEJA}`,'POST',queja),//endpoint para crear queja

	
	}
};

export default resolvers;
