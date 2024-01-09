import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { baseurlLogin } from "./baseUrl";

export interface Login {
    token: string;
    ID: number | undefined;
    Username: string;
    Password: string;
    Role: string;
    Version: string;
    PC: string;
    Status: string;
    Q1: string;
    Q2: string;
    Q3: string;
    Input_Duration:string
}

const LoginModel = {
    register: async ({ ID, Username, Password, Q1, Q2, Q3 }: Login) => {
        try {
            const res: AxiosResponse<Login> = await axios.post(`${baseurlLogin}/Registrasi`, {
                ID: ID,
                Username: Username,
                Password: Password,
                Q1: Q1,
                Q2: Q2,
                Q3: Q3
            });
            return res.data;
        } catch (error) {
            console.log("Gagal Regis", error);
            throw error;
        }
    },
    login: async ({ Username, Password, PC, Version }: Login) => {
        try {
            const res: AxiosResponse<Login> = await axios.post(`${baseurlLogin}/login`, {
                Username: Username,
                Password: Password,
                PC: PC,
                Version:Version
            });

            const Token = res.data.token;

            if (Token) {
                await AsyncStorage.setItem("token", Token);
            } else {
                console.log("Token tidak ditemukan dalam respons setelah login.");
            }

            return Token;
        } catch (error) {
            console.log("Gagal Login", error);
            throw error;
        }
    },
    
    lastInput: async (
        Username: string,
        entity: {
            Input_Duration: string
        }) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login ulang');
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse = await axios.put(`
            ${baseurlLogin}/LastInput/${Username}`, entity, { headers });
            if (res.status === 201) {
                return res.data.message
            } else if (res.status === 401) {
                return res.data.message
            }
        } catch (error: any) {
            console.error(`error login model`, error.message);
            throw new Error(`${error.message}, error user login`);
        }
    },
    lastLogin: async (
        entity: {
            PC: string,
            Version:string
        }
    ) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login ulang');
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse = await axios.put(`
                ${baseurlLogin}/LastLogin`, entity, { headers });
            if (res.status === 201) {
                return res.data.message
            } else if (res.status === 401) {
                return res.data.message
            }
        } catch (error:any) {
            throw new Error(`${error.message}, error LastLogin`);
        }
    },
    lastLogout: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login ulang');
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse = await axios.get(`${baseurlLogin}/Logout`, { headers });
            if (res.status === 201) {
                return res.data.message
            } else if(res.status === 401){
                console.log('Error Response Data:', res.data);
                return res.data.message
            }
        } catch (error:any) {
            throw new Error(`${error.message}, error LastLogout`);
        }
    },
    logout: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login ulang');
                return;
            }
            const headers = {
                Authorization:`Bearer ${token}`
            }
            const res: AxiosResponse =await axios.get(`${baseurlLogin}/Logout`, { headers });
            await AsyncStorage.removeItem('token');
            if (res.status === 201) {
                return res.data.message
            } else if (res.status === 401) {
                console.log('Error Response Data:', res.data);
                return res.data.message
            }
            
        } catch (error) {
            console.log('Gagal Logout');
            throw error;
        }
    },
    profile: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Login> = await axios.get(`
            ${baseurlLogin}/profile`, { headers });
            return res.data;
        } catch (error) {
            console.log('Gagal Memuat Data');
            throw error;
        }
    },
    allUser: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Login[]> = await axios.get(`
            ${baseurlLogin}/alluser`, { headers });
            return res.data;
        } catch (error) {
            console.log('Gagal Memuat Data');
            throw error;
        }
    },
};

export default LoginModel;