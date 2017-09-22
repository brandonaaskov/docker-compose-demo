import _ from 'lodash'
import axios from 'axios'
import axiosDefaults from 'axios/lib/defaults'

axiosDefaults.timeout = 120000 // 2 minute timeout
// axiosDefaults.headers.common['X-CSRF-Token'] = _.get(document.querySelector('#root'), 'attributes.csrf.value')

const { API_HOST, API_PORT } = process.env
const host = API_HOST || 'http://test.com'
const port = API_PORT ? `:${API_PORT}` : ''
const baseUrl = `${host}${port}`

const endpoint = pathname => {
  if (!pathname) return `${baseUrl}/`
  return `${baseUrl}/${pathname}`
}

const healthCheck = () => {
  const uri = endpoint()
  return axios.get(uri).then(res => res.data)
}

const saveMessage = (text = '') => {
  const uri = endpoint()
  return axios.post(uri, { text }).then(res => res.data)
}

export default { healthCheck, saveMessage }
