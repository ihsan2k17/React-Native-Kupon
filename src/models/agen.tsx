import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosResponse } from "axios";
import { baseUrlAgen } from "./baseUrl";

export interface Agen {
    AgenID: string;
    Agen_Name: string;
    Kota: string;
    SalesID: string;
    Sales_Name: string
}

const AgenModel =  {
    ListAgen:async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan, login ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Agen[]> = await axios.get(`${baseUrlAgen}/GetAll`, { headers });
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    },
    ListAgenByNama: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan, login ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const AxiosConfig = {
                setTimeout: 2000,
                headers
            }
            const res: AxiosResponse<Agen[]> = await axios.get(`${baseUrlAgen}/getnama`, AxiosConfig);
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    },
    ListKotaAgen: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan, login ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const AxiosConfig = {
                setTimeout: 1000,
                headers
            }
            const res: AxiosResponse<Agen[]> = await axios.get(`${baseUrlAgen}/getkotaagen`, AxiosConfig);
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    },
    searchAgenByNama: async (search: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Agen[]> = await axios.get(
                `${baseUrlAgen}/searchName/${search}`, { headers })
            return res.data
        } catch (error) {
            throw error
        }
    },
    searchAgen: async (search: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Agen[]> = await axios.get(
                `${baseUrlAgen}/searchAgen/${search}`, { headers })
            return res.data
        } catch (error) {
            throw error
        }
    },
    ListAgenFindNama: async (Agen_Name: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Agen[]> = await axios.get(
                `${baseUrlAgen}/getallnama/${Agen_Name}`, { headers })
            return res.data
        } catch (error: any) {
            throw new Error(error.response.data.message)
        }
    },
    AddAgen: async (agenQuery: Agen) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse = await axios.post(
                `${baseUrlAgen}/createagen`,agenQuery, { headers })
            return res.data
        } catch (error) {
            throw error
        }
    }
}

export default AgenModel;