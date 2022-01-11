import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import axios from '../services/axios'
import AsyncStorage from '@react-native-community/async-storage'

export default (options, token, config) => {
  const [response, setResponse] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        // const token = await AsyncStorage.getItem('token')
        const tokens =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmY2EyYTk5YWRhYzgwMTVjYmIzMDZhYiIsImVtYWlsIjoibS5kc2EuYWltYW5AZ21haWwuY29tIiwiaWF0IjoxNjA3NDkyMDIzfQ.MSmLLhR6xH0CvN-gZ4w_QO5sWKLVpukrvfjsWqQ-eOI'
        options.headers = {
          token: tokens,
        }
      }

      axios(options)
        .then(({data}) => {
          setResponse(data)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(true)
          setIsLoading(false)
        })
    }

    fetchData()
  }, [])

  return {response, error, isLoading}
}