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

export async function addParqueadero(idAdministrador, nombre) {
    const formData = new FormData();
    formData.append("idAdministrador", idAdministrador);
    formData.append("nombre", nombre);

    const response = await api.post("/parqueaderos/add/new-parqueadero", formData);

    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
}

export async function updateParqueadero(idParqueadero, idAdministrador, nombre) {
    const response = await api.put(`/parqueaderos/update/${idParqueadero}`, {
        idAdministrador,
        nombre
    });

    if (response.status === 200) {
        return true;
    } else {
        return false;
    }
}

export async function deleteParqueadero(idParqueadero) {
    const response = await api.delete(`/parqueaderos/delete/parqueadero/${idParqueadero}`);

    if (response.status === 204) {
        return true;
    } else {
        return false;
    }
}

export async function getAllParqueaderos() {
    try {
        const response = await api.get("/parqueaderos/all-parqueaderos");
        return response.data;
    } catch (error) {
        throw new Error("Error obteniendo la lista de parqueaderos");
    }
}
