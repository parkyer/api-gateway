import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}/api`;
const PARKINGS='parkinglot';
const GET_PARKINGBYID='getById';
const GET_USERPARKINGLOTS='getOwnerParkingLots';
const UPDATE='update';

const resolvers = {
	Query: {
		//CUSTOM ENDPONTS
		getParkingsCreated:(_)=> 
			generalRequest(`${URL}/${PARKINGS}`, 'GET'),

		getParkingById:(_,{ id })=>
			generalRequest(`${URL}/${PARKINGS}/${GET_PARKINGBYID}/${id}`, 'GET'),
		
		getOwnerParkingLots:(_,{ id })=>
			generalRequest(`${URL}/${PARKINGS}/${GET_USERPARKINGLOTS}/${id}`, 'GET'),
		
	},
	
	Mutation: {
		//CUSTOM ENDPONTS
		createParking:(_,{parking})=>
			generalRequest(`${URL}/${PARKINGS}`,'POST', parking),
		updateParkingById:(_,{id,parking})=>
			generalRequest(`${URL}/${PARKINGS}/${UPDATE}/${id}`, 'PUT',parking),
		deleteParkingById:(_,{id})=>
			generalRequest(`${URL}/${PARKINGS}/${id}`, 'DELETE'),
	}
};

export default resolvers;
