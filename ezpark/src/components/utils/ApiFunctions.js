import axios from "axios";

// Create an Axios instance with the base URL
export const api = axios.create({
    baseURL: "http://localhost:9192",
});

// Function to get the headers with the JWT token
export const getHeader = (isFormData = false) => {
    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`
    };
    if (!isFormData) {
        headers["Content-Type"] = "multipart/form-data";
    } 
    //Cambio aqui
    return headers;
};

// User registration
export const registerUser = async (userData) => {
    try {
        console.log(userData);
        const response = await api.post(`http://localhost:9192/auth/register-user`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// User login
export const loginUser = async (loginData) => {
    try {
        console.log(loginData);
        const response = await api.post(`http://localhost:9192/auth/login`, loginData);
        localStorage.setItem("idUsuario", response.data.id);
        console.log(response.data.id);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server Error:', error.response.data);
            throw new Error('Server Error');
        } else if (error.request) {
            console.error('No response received:', error.request);
            throw new Error('No response received');
        } else {
            console.error('Request setup error:', error.message);
            throw new Error('Request setup error');
        }
    }
};

// Get user by email
export const getUserByEmail = async (email) => {
    try {
        const response = await api.get(`http://localhost:9192/usuarios/${email}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Delete user by email
export const deleteUserByEmail = async (email) => {
    try {
        const response = await api.delete(`http://localhost:9192/usuarios/eliminar/${email}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Role-related functions
export const getAllRoles = async () => {
    try {
        const response = await api.get(`http://localhost:9192/roles/todos-los-roles`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createRole = async (roleData) => {
    try {
        const response = await api.post(`http://localhost:9192/roles/crear-nuevo-rol`, roleData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Parking-related functions
export async function addNewParqueadero(idAdministrador, nombre) {
    const formData = new FormData();
    formData.append("idAdministrador", idAdministrador);
    formData.append("nombre", nombre);

    console.log('FormData:', ...formData); // Log FormData to debug
 
    try {
        const response = await api.post("http://localhost:9192/parqueaderos/add/new-parqueadero", formData, {
            headers: getHeader()
        });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Error al agregar el parqueadero");
        }
    } catch (error) {
        throw new Error("Error de red: " + error.message);
    }
}


export const getAllParqueaderos = async () => {
    try {
        const response = await api.get(`http://localhost:9192/parqueaderos/all-parqueaderos`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteParqueadero = async (parqueaderoId) => {
    try {
        await api.delete(`http://localhost:9192/parqueaderos/delete/parqueadero/${parqueaderoId}`, {
            headers: getHeader()
        });
    } catch (error) {
        throw error.response.data;
    }
};

export async function updateParqueadero(idParqueadero, nombre) {
    const formData = new FormData();
    formData.append("nombre", nombre);
    try {
        const response = await axios.put(`http://localhost:9192/parqueaderos/update/${idParqueadero}`, formData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

export async function getParqueaderoById(idParqueadero) {
	try {
		const result = await api.get(`http://localhost:9192/parqueaderos/parqueadero/${idParqueadero}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

export const getEspaciosOfParqueaderoById = async (idParqueadero) => {
    try {
        const response = await api.get(`http://localhost:9192/parqueaderos/parqueadero/${idParqueadero}`, {
            headers: getHeader()
        });
        return response.data.espacioResponses;
    } catch (error) {
        throw error.response.data.espacioResponses;
    }
};

// Space-related functions
export const addNewEspacio = async (tipo, idParqueadero) => {
    const formData = new FormData();
    formData.append("tipo", tipo);
    formData.append("parqueadero", idParqueadero);

    try {
        const response = await api.post("http://localhost:9192/espacios/add/new-espacio", formData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getAllEspacios = async () => {
    try {
        const response = await api.get(`http://localhost:9192/espacios/all-espacios`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getEspacioById = async (idEspacio) => {
    try {
        const response = await api.get(`http://localhost:9192/espacios/espacio/${idEspacio}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Reservation-related functions
export const getAllReservas = async () => {
    try {
        const response = await api.get(`http://localhost:9192/reservas/all-reservas`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const saveReserva = async (idEspacio, reservaData) => {
    try {
        const response = await api.post(`http://localhost:9192/reservas/espacio/${idEspacio}/reserva`, reservaData, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const cancelReserva = async (idReserva) => {
    console.log(idReserva)
    try {
        await api.delete(`http://localhost:9192/reservas/reserva/${idReserva}/delete`, {
            headers: getHeader()
        });
    } catch (error) {
        if (error.response) {
            console.error('Server Error:', error.response.data);
            throw new Error('Server Error');
        } else if (error.request) {
            console.error('No response received:', error.request);
            throw new Error('No response received');
        } else {
            console.error('Request setup error:', error.message);
            throw new Error('Request setup error');
        }
    }
};

export const getReservaById = async (idReserva) => {
    try {
        const response = await api.get(`http://localhost:9192/reservas/id/${idReserva}`, {
            headers: getHeader()
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Server Error:', error.response.data);
            throw new Error('Server Error');
        } else if (error.request) {
            console.error('No response received:', error.request);
            throw new Error('No response received');
        } else {
            console.error('Request setup error:', error.message);
            throw new Error('Request setup error');
        }
    }
};
