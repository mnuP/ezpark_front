import axios from "axios";

export const api = axios.create({
    baseURL :"http://localhost:9192"
})

export async function AddParqueadero(idAdministrador, nombre) {
    const formData = new FormData()
    formData.append("idAdministrador", idAdministrador)
    formData.append("nombre", nombre)

    const response = await api.post("/parqueaderos/add/new-parqueadero", FormData)
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