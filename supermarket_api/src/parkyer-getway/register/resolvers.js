import { generalRequest, getRequest } from '../../utilities';
import { url, port ,entryPoint} from './server';

const URL = `http://${url}:${port}/${entryPoint}`;
const ADD_Register='add_Register';
const GET_Register='get_Register';
const DELETE_Register='delete_Register';
//const ADD_AVATAR='add_avatar';
//const GET_AVATAR='get_avatar';


const resolvers = {
	Query: {
		//CUSTOM ENDPONTS
		getRegister:(_, { id })=> //endpoint para traer usuario
			generalRequest(`${URL}/${GET_Register}/${id}`, 'GET'),

		get_Registers: (_) =>
		generalRequest(URL, 'GET'),
		
	
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createRegister:(_, {Register})=>
			generalRequest(`${URL}/${ADD_Register}`,'POST',Register),//endpoint para crear usuario
		deleteRegister:(_,{ id })=>
			generalRequest(`${URL}/${DELETE_Register}/${id}`, 'DELETE'),//endpoint para borrar usuario
		
	}
};

export default resolvers;
