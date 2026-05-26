import api from './api'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = api.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await api.post(baseUrl, newObject, config)
  return response.data
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
  toggleNote,
  setToken
}