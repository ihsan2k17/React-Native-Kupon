import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";

export interface Sales {
    SalesID: string;
    Sales_Name: string;
}

const baseUrl = "http://192.168.77.222:8080/Kupon/Api/sales"

const SalesModel = {
    getAllSales: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Sales[]> = await axios.get(
                `${baseUrl}/getAll`,{headers})
            return res.data;
        } catch (error) {
            throw new Error("Gagal Memuat Data");
        }
    },
    getNamaSales: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Sales[]> = await axios.get(
                `${baseUrl}/getname`, { headers })
            return res.data
        } catch (error) {
            throw error
        }
    },
    searchSales: async (query:string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Sales[]> = await axios.get(
                `${baseUrl}/search/${query}`,{headers})
            return res.data
        } catch (error) {
            console.log('data tidak ada');
            throw error
        }
    },
    createSales: async (salesData: Sales) => {
        try {
            const res: AxiosResponse = await axios.post(`${baseUrl}/create`, salesData);
            return res.data;
        } catch (error) {
            console.log('Gagal Membauat Data Sales');
            throw error;
        }
    }
}

export default SalesModel