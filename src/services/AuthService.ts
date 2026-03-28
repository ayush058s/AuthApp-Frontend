import type RegisterData from "@/models/RegisterData";
import apiClient from "@/config/ApiClient";

// before this config axios in  ApiClient in config package 
// api call to server to save data
export const registerUser = async (signupData: RegisterData) => {
    const response = await apiClient.post(`/auth/register`, signupData);
    return response.data;
}

// login



// get cuurent login user



// refresh token


// apis