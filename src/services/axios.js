import axios from 'axios'
import {Cache} from '../utils'

const instance = axios.create({
  baseURL: 'http://192.168.0.107:3000',
})

// const get = instance.get
// instance.get = async (url, params, axiosConfig) => {
//   const response = await get(url, params, axiosConfig)

//   try {
//     if (response) {
//       Cache.store(url, response.data)
//       return response
//     }
//   } catch (error) {
//     console.log(error)
//   }

//   const data = await Cache.get('url')
//   return data ? {ok: true, data} : response
// }

export default instance
