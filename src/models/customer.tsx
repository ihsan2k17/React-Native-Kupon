import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosResponse } from "axios";
import { baseUrlCustomer } from "./baseUrl";



export interface Customer {
    TotalCountID:number
    ID: number,
    Customer: string,
    Nama: string,
    Alamat: string,
    HP: string,
    Email: string,
    AgenId: string,
    Status: string,
    SalesId: string,
    Kota: string,
    Whatsapp: string,
    Keterangan: string,
    Jenis: string,
    User_Input: string
}

const CustomerModel = {
    listId: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan, login ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Customer[]> = await axios.get(`${baseUrlCustomer}/getid`, { headers });
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    },
    TotalIdCustomer: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan, login ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Customer[]> = await axios.get(`${baseUrlCustomer}/count`, { headers });
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    },
    searchAllCust: async (search: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan, login ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Customer[]> = await axios.get(`${baseUrlCustomer}/searchallcust/${search}`, { headers });
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    },
    listNamabyCustomer: async (Customer: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan, login ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Customer[]> = await axios.get(
                `${baseUrlCustomer}/GetAllbyCust/${Customer}`, { headers });
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    }, 
    listCurrentCustomerbyCustomer: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan, login ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Customer[]> = await axios.get(
                `${baseUrlCustomer}/getCurrent`, { headers });
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    },
    selectIdNew: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan, login ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Customer[]> = await axios.get(`${baseUrlCustomer}/selecttop`, { headers });
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    },
    addIdCustomer: async (CustomerData: Customer) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse =
                await axios.post(`${baseUrlCustomer}/addcust`, CustomerData, { headers });
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}

export default CustomerModel;