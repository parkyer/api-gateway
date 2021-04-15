import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}`;
const Inicio='inicio';
const Contacto='contacto';


const resolvers = {
	Query: {
		//CUSTOM ENDPONTS
		getInicio:(_)=> //endpoint para traer registros
			generalRequest(`${URL}/${Inicio}`, 'GET'),
		
	
		
	},
	Mutation: {
		//CUSTOM ENDPONTS
		crearMensaje:(_, {mensaje})=>
			generalRequest(`${URL}/${Contacto}`,'POST',mensaje),//endpoint para crear usuario
	}
};

export default resolvers;