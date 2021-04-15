import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

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

export default resolvers;
