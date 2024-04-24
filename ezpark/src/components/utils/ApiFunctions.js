import axios from "axios";

export const api = axios.create({
    baseURL :"http://localhost:9192"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

export async function addParqueadero(idAdministrador, nombre) {
    const formData = new FormData()
    formData.append("idAdministrador", idAdministrador)
    formData.append("nombre", nombre)

    const response = await api.post("/parqueaderos/add/new-parqueadero", formData)

    if(response.status === 201) {
        return true
    }else{
        return false
    }
}

export async function getTipoParqueadero() {
    try{
        const response = await api.get("/parqueaderos/TipoParqueadero")
        return response.data
    }catch(error){
        throw new Error("Error obteniendo el tipo de parqueadero")
    }
}