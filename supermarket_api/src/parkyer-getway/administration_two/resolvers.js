import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}`;
const GET_PARKINGS='parkings';
const GET_PARKINGSUSED='parkingsusedby';
const NEW='newsuscription';
const DELETE='deletesuscription';
const GET_AVAILABLE='availableparkings';

const resolvers = {
	Query: {
		//CUSTOM ENDPONTS
		getParkings:(_)=> 
			generalRequest(`${URL}/${GET_PARKINGS}`, 'GET'),

		getParkingsUsedBy:(_,{ id })=>
			generalRequest(`${URL}/${GET_PARKINGSUSED}/${id}`, 'GET'),

		getAvailableParkings:(_)=> 
			generalRequest(`${URL}/${GET_AVAILABLE}`, 'GET'),
		
	},
	
	Mutation: {
		//CUSTOM ENDPONTS
		newSuscription:(_, {id, client})=>
			generalRequest(`${URL}/${NEW}/${id}`,'PUT', client),
		deleteSuscription:(_,{id})=>
			generalRequest(`${URL}/${DELETE}/${id}`, 'PUT'),
	}
};

export default resolvers;
