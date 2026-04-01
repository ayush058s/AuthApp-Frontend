import type RegisterData from "@/models/RegisterData";
import apiClient from "@/config/ApiClient";
import type { LoginData } from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
import type User from "@/models/User";

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


// get user by email
export const getCurrentUser = async (emailId: string | undefined) => {
    const response = await apiClient.get<User>(`/users/email/${emailId}`);
    return response.data;
}


// get all users
export const allUsers = async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>(`/users`);
    return response.data;
}


// refresh token
export const refreshToken = async () => {
    const response = await apiClient.post<LoginResponseData>(`/auth/refresh`);
    return response.data;
}


// apis