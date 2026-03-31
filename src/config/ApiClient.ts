import useAuth from '@/auth/store';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
    headers:{
        'Content-Type': "application/json",
    },
    withCredentials: true,
    timeout: 10000,
})

// we will use interceptors to send bearer token in headers with every request
apiClient.interceptors.request.use((config) => {
    const accessToken = useAuth.getState().accessToken  ;
    if(accessToken){
        config.headers.Authorization= `Bearer ${accessToken}`
    }
    
    return config;
})

export default apiClient;