import axios from "axios";

export const api = axios.create({
	baseURL: "http://localhost:9192"
});

export const getHeader = () => {
	const token = localStorage.getItem("token");
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	};
};

export const registerUser = async (userData) => {
	try {
		console.log(userData)
		const response = await axios.post(`http://localhost:9192/auth/register-user`, userData);
	  		return response.data;
		} catch (error) {
	  		throw error.response.data;
	}
};
  
export const loginUser = async (loginData) => {
	try {
		console.log(loginData)
	  	const response = await axios.post(`http://localhost:9192/auth/login`, loginData);
		console.log(response.data);
	  	return response.data;
	} catch (error) {
        if (error.response) {
            // Server responded with a status code outside of 2xx
            console.error('Server Error:', error.response.data);
            throw new Error('Server Error');
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            throw new Error('No response received');
        } else {
            // Something else happened while setting up the request
            console.error('Request setup error:', error.message);
            throw new Error('Request setup error');
        }
    }
};
  
export const getUserByEmail = async (email) => {
	try {
	  	const response = await axios.get(`${BASE_URL}/usuarios/${email}`);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
export const deleteUserByEmail = async (email) => {
	try {
	  	const response = await axios.delete(`${BASE_URL}/usuarios/eliminar/${email}`);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
// Funciones relacionadas con roles
export const getAllRoles = async () => {
	try {
	  	const response = await axios.get(`${BASE_URL}/roles/todos-los-roles`);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
export const createRole = async (roleData) => {
	try {
	  	const response = await axios.post(`${BASE_URL}/roles/crear-nuevo-rol`, roleData);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
// Funciones relacionadas con parqueaderos
export const addNewParqueadero = async (parqueaderoData) => {
	try {
	  	const response = await axios.post(`${BASE_URL}/parqueaderos/add/new-parqueadero`, parqueaderoData);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
export const getAllParqueaderos = async () => {
	try {
	  	const response = await axios.get(`${BASE_URL}/parqueaderos/all-parqueaderos`);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
export const deleteParqueadero = async (parqueaderoId) => {
	try {
	  	await axios.delete(`${BASE_URL}/parqueaderos/delete/parqueadero/${parqueaderoId}`);
	} catch (error) {
	  	throw error.response.data;
	}
};
  
export const updateParqueadero = async (idParqueadero, parqueaderoData) => {
	try {
		const response = await axios.put(`${BASE_URL}/parqueaderos/update/${idParqueadero}`, parqueaderoData);
		return response.data;
	} catch (error) {
		throw error.response.data;
	}
};
  
export const getParqueaderoById = async (idParqueadero) => {
	try {
	  	const response = await axios.get(`${BASE_URL}/parqueaderos/parqueadero/${idParqueadero}`);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
// Funciones relacionadas con espacios
export const addNewEspacio = async (espacioData) => {
	try {
	  	const response = await axios.post(`${BASE_URL}/espacios/add/new-espacio`, espacioData);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
export const getAllEspacios = async () => {
	try {
	  	const response = await axios.get(`${BASE_URL}/espacios/all-espacios`);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
export const getEspacioById = async (idEspacio) => {
	try {
	  	const response = await axios.get(`${BASE_URL}/espacios/espacio/${idEspacio}`);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
// Funciones relacionadas con reservas
export const getAllReservas = async () => {
	try {
	  	const response = await axios.get(`${BASE_URL}/reservas/all-reservas`);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
export const saveReserva = async (idEspacio, reservaData) => {
	try {
	  	const response = await axios.post(`${BASE_URL}/reservas/espacio/${idEspacio}/reserva`, reservaData);
	  	return response.data;
	} catch (error) {
	  	throw error.response.data;
	}
};
  
export const cancelReserva = async (idReserva) => {
	try {
	  	await axios.delete(`${BASE_URL}/reservas/reserva/${idReserva}/delete`);
	} catch (error) {
	  	throw error.response.data;
	}
};

export const getReservaById = async (idReserva) => {
	try {
	  	const response = await axios.get(`http://localhost:9192/reservas/id/${idReserva}`);
	  	return response.data;
	} catch (error) {
        if (error.response) {
            // Server responded with a status code outside of 2xx
            console.error('Server Error:', error.response.data);
            throw new Error('Server Error');
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            throw new Error('No response received');
        } else {
            // Something else happened while setting up the request
            console.error('Request setup error:', error.message);
            throw new Error('Request setup error');
        }
    }
};