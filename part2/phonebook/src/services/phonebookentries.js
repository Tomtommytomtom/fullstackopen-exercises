import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)


}

const getOne = (id) => {
    return axios.get(`${baseUrl}/${id}`)
    
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log(`${baseUrl}/${id}`);
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
    
}

const deletePerson = (id) =>
    axios.delete(`${baseUrl}/${id}`)

    
export default {
    getOne,
    getAll,
    create,
    update,
    deletePerson
}