import { generalRequest, getRequest } from '../../utilities';
import { url, port} from './server';

const URL = `http://${url}:${port}`;
const ADD_USER='add_user';
const LOGIN='login';

const resolvers = {
	Query: {
		//CUSTOM ENDPONTS
	},
	Mutation: {
		//CUSTOM ENDPONTS
		crearUsuario:(_, {usuario})=>
			generalRequest(`${URL}/${ADD_USER}`,'POST',usuario),//endpoint para crear usuario
        iniciarSesion:(_,{login})=>
            generalRequest(`${URL}/${LOGIN}`,'POST',login)
	}
};

export default resolvers;