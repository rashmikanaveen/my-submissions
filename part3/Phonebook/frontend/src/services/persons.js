import api from './api'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = api.get(baseUrl)
    return request.then(response => response.data)
  }
  
  const create = newObject => {
    const request = api.post(baseUrl, newObject)
    return request.then(response => response.data)
  }
  const removename = (id) => {
    const request = api.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
  }
  const update = (id, newObject) => {
    const request = api.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
  
  
  
  export default { 
    getAll,
    create ,
    removename,
    update
    
  }