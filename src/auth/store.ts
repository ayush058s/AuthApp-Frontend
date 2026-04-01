import type { LoginData } from "@/models/LoginData";
import type LoginResponseData from "@/models/LoginResponseData";
import type User from "@/models/User";
import { loginUser, logoutUser } from "@/services/AuthService";
// import { User } from "lucide-react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const LOCAL_KEY = "app_state";
// type AuthState = "idle" | "authenticating" | "authenticated" | "anonymous"

//global authstate:
type AuthState = {
  accessToken: string | null;
  user: User | null;
  authStatus: boolean;
  authLoading: boolean;
  login: (loginData: LoginData) => Promise<LoginResponseData>;
  logout: (silent?: boolean) => void;
  checkLogin: () => boolean |  undefined;
  changeLocalLoginData: (
    accessToken: string, 
    user: User, 
    authStatus: boolean
  ) => void;
};

// main logic for global state.
// whenever we want to return an object, return like this () => ({})
const useAuth = create<AuthState>()(persist(
  (set, get) => ({
  accessToken: null,
  user: null,
  authStatus: false,
  authLoading: false,
  login: async (loginData) => {
    console.log("login done.");
    set({ authLoading: true });

    try {
      const loginResponseData = await loginUser(loginData);
      // we got the data from backend after login now we will set the data from login data into store (state)

      set({
        // get the data, user and set the authStatus true
        accessToken: loginResponseData.accessToken,
        user: loginResponseData.user,
        authStatus: true,
      });
      return loginResponseData;
    } catch (error) {
      throw error;
    }finally{
        set({authLoading: false})
    }
  },
  logout: async (silent = false) => {
    {/*??????????????????*/}
    try {
        
      set({
        authLoading: true
      });
      await logoutUser();
        
    } catch (error) {
        
    }finally{
      set({
        authLoading: false
      })
    }
    // logout from both frontend and backend
    // await logoutUser();

    set({
        accessToken: null,
        user: null,
        authLoading: false,
        authStatus: false,

    })
  },
  checkLogin: () => {
    if(get().accessToken && get().authStatus){
        return true;
    }else{
        return false;
    }
  },
  changeLocalLoginData:(accessToken, user, authStatus) => {
    set({
      accessToken,
      user,
      authStatus
    })
  }
})
  ,{ name: LOCAL_KEY }));

export default useAuth;
