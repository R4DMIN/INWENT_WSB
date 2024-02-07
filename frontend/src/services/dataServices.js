import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/assetdata'

const getAll = (columns) => {
    const newUrl = columns ? baseUrl + '?columns=' + columns.toString() : baseUrl
    const request = axios.get(newUrl)
    return request.then(response => response.data)
}

const getById = (id) => {
    //console.log(id);
    const newUrl = baseUrl + "/" + id
    //console.log(newUrl);
    const request = axios.get(newUrl)
    return request.then(response => response.data)
}

const updateById = (id, data) => {
    const newUrl = baseUrl + "/" + id
    const request = axios.put(newUrl, data)
    //console.log("data", data);
    return request.then(response => response.data)
}

const addNew = (data) => {
    const request = axios.post(baseUrl, data)
    return request.then(response => response.data)
}

const getBySn = (sn) => {
    const newUrl = baseUrl + '/sn/' + sn
    const request = axios.get(newUrl)
    return request.then(response => response.data)
}

const dataService = { getAll, getById, updateById, addNew, getBySn }
export default dataService