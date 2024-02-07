import axios from 'axios';
const baseUrl = 'http://localhost:3001/api'

const getAll = () => {
    const request = axios.get(baseUrl + '/datafields')
    return request.then(response => response.data)
}

const getKeyHeaders = () => {
    const request = axios.get(baseUrl + '/keyheaders')
    return request.then(response => response.data)
}

const dataFieldsServices = { getAll, getKeyHeaders }

export default dataFieldsServices