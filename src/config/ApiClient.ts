import useAuth from '@/auth/store';
import { refreshToken } from '@/services/AuthService';
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


// we will check  if it refreshing or not
let isRefreshing = false;
// if the token is refreshing and more request comes at that time we will store it in pending array
let pending: any[] = [];

// push the coming request in queue during refreshing
function queueRequest(cb: any){
    pending.push(cb);
}


function resolveQueue(newToken: string){
    pending.forEach((cb) => cb(newToken));
    pending= [];
}

// we will use response interceptors to handlle accesstoken expiry issue
apiClient.interceptors.response.use(
    (response) => response, 
    async (error) => {
       
        console.log("refreshed")
        // we will check if the error has a status 401 and mesaage "Token Expired" then we will call refreshtoken
        const is401 = error.response.status === 401;
        const original = error.config;
        console.log(original);
        
        // if it is not 401 error then continue with error
        if(!is401 || original._retry){
            return Promise.reject(error);
        }
        original._retry=true;

        // we will try to refresh token
        if(isRefreshing){
            console.log("added to queue")
            return new Promise((resolve, reject) => {
                queueRequest((newToken: string) => {
                    if(!newToken){
                        return reject();
                    }   
                    original.headers.Authorization= `Bearer ${newToken}`;
                    resolve(apiClient(original))
                })
            })
        }

        // now we will refresh the token 
        isRefreshing = true;
        try {
            console.log("token refreshing")
            // now we will call refresh token api from backend using authService
            const loginResponse = await refreshToken();
            const newToken = loginResponse.accessToken;
            if(!newToken){
                throw new Error("No access token received")
            }
            // and now if we get accesstoken then we will fit it into auth store
            /// we will create a method inside authState so that we can change  th accessToken variable
            useAuth
            .getState()
            .changeLocalLoginData(
                loginResponse.accessToken,
                loginResponse.user,
                true
            );
            // resolve all queues
            resolveQueue(newToken);

            original.headers.Authorization= `Bearer ${newToken}`
            return apiClient(original);

        } catch (error) {
            resolveQueue("null");
            useAuth.getState().logout();
            return Promise.reject(error);
        } finally{
            isRefreshing: false;
        }
         
    }
)

export default apiClient;