import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:8080/',
    withCredentials: true,
})

let getAccessToken = () => null
let dispatchFn = () => { }

export const setApiAuth = ({ getToken, dispatch }) => {
    getAccessToken = getToken
    dispatchFn = dispatch
}

let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) prom.reject(error)
        else prom.resolve(token)
    })
    failedQueue = []
}

api.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) config.headers['Authorization'] = `Bearer ${token}`
    return config
})

api.interceptors.response.use(
    res => res,
    async (err) => {
        const originalRequest = err.config

        if (err.response && err.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token
                    return axios(originalRequest)
                }).catch(e => Promise.reject(e))
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const response = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {}, { withCredentials: true })
                const newToken = response.data.accessToken
                dispatchFn({ type: 'auth/refreshTokenSuccess', payload: newToken })
                processQueue(null, newToken)
                originalRequest.headers['Authorization'] = 'Bearer ' + newToken
                return axios(originalRequest)
            } catch (e) {
                processQueue(e, null)
                dispatchFn({ type: 'auth/logout' })
                return Promise.reject(e)
            } finally {
                isRefreshing = false
            }
        }

        return Promise.reject(err)
    }
)

export default api