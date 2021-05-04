import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}`;
const VEHICLE='vehiculos';
const GET_VEHICLE='vehiculos/ver';
const GET_VEHICLES='vehiculos';
const EDIT_VEHICLE='vehiculos';
const DELETE_VEHICLE='vehiculos';


const resolvers = {
	Query: {
		//CUSTOM ENDPONTS
		getAllVehicles:(_)=> //endpoint para traer usuario
			generalRequest(`${URL}/${GET_VEHICLES}`, 'GET'),

		getVehicle:(_, { id_client })=> //endpoint para traer queja
			generalRequest(`${URL}/${GET_VEHICLE}/${id_client}`, 'GET'),

		getVehiclebyId:(_, { id })=> //endpoint para traer queja
			generalRequest(`${URL}/${VEHICLE}/${id}`, 'GET'),
			//EXAMPLE ENDPOINTS
		/*allCategories: (_) =>
			getRequest(URL, ''),
		categoryById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),*/
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		createVehicle:(_, {vehicle})=>
			generalRequest(`${URL}/${VEHICLE}`,'POST',vehicle),
		updateVehicle:(_,{id, vehicle})=>
			generalRequest(`${URL}/${EDIT_VEHICLE}/${id}`, 'PUT', vehicle),
		deleteVehicle:(_,{ id })=>
			generalRequest(`${URL}/${DELETE_VEHICLE}/${id}`, 'DELETE')

			
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

export default resolvers;