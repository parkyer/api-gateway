import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}/api`;
const PARKINGS='parkinglot';
const GET_PARKINGBYID='getById';
const UPDATE='update';

const resolvers = {
	Query: {
		//CUSTOM ENDPONTS
		getParkingsCreated:(_)=> 
			generalRequest(`${URL}/${PARKINGS}`, 'GET'),

		getParkingById:(_,{ id })=>
			generalRequest(`${URL}/${PARKINGS}/${GET_PARKINGBYID}/${id}`, 'GET'),
		
	},
	
	Mutation: {
		//CUSTOM ENDPONTS
		createParking:(_,{id,parking})=>
			generalRequest(`${URL}/${PARKINGS}`,'POST', parking),
		updateParkingById:(_,{id,parking})=>
			generalRequest(`${URL}/${PARKINGS}/${UPDATE}/${id}`, 'PUT',parking),
		deleteParkingById:(_,{id})=>
			generalRequest(`${URL}/${PARKINGS}/${id}`, 'DELETE'),
	}
};

export default resolvers;
