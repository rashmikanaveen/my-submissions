import api from './api'
const baseUrl = '/api/notes'

const getAll = () => {
  const request = api.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = api.post(baseUrl, newObject)
  return request.then(response => response.data)
}
const removeNote = (id) => {
  const request = api.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const toggleNote = (id, updatedObject) => {
  const request = api.put(`${baseUrl}/${id}`, updatedObject)
  return request.then(response => response.data)
}



export default {
  getAll,
  create,
  removeNote,
  toggleNote
}