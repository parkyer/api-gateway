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
		getRegister:(_, { id })=> //endpoint para traer registros
			generalRequest(`${URL}/Get/${id}`, 'GET'),
		
		getRegisterUser:(_, { user })=> //endpoint para traer usuario
			generalRequest(`${URL}/GetUser/${user}`, 'GET'),
		
		getRegisterParking:(_, { parkingId })=> //endpoint para traer usuario
			generalRequest(`${URL}/GetParking/${parkingId}`, 'GET'),
			
		get_Registers: (_) =>
		generalRequest(URL, 'GET'),
		
	
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createRegister:(_, {Register})=>
			generalRequest(`${URL}`,'POST',Register),//endpoint para crear registro
		deleteRegister:(_,{ id })=>
			generalRequest(`${URL}/${id}`, 'DELETE'),//endpoint para borrar registro
		
	}
};

export default resolvers;
