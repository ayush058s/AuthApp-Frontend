import type RegisterData from "@/models/RegisterData";
import apiClient from "@/config/ApiClient";
import type { LoginData } from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";

// before this config axios in  ApiClient in config package 
// api call to server to save data
export const registerUser = async (signupData: RegisterData) => {
    const response = await apiClient.post(`/auth/register`, signupData);
    return response.data;
}

// login
export const loginUser = async (loginData: LoginData) => {
    const response = await apiClient.post<LoginResponseData>(`/auth/login`, loginData);
    return response.data;
}

export const logoutUser = async () => {
    const response = await apiClient.post(`/auth/logout`);
    return response.data;
}



// get cuurent login user



// refresh token


// apis