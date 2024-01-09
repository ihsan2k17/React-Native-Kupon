import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosResponse } from "axios";
import { baseUrlCustomerNakami } from "./baseUrl";
export interface CustomerNkm {
    TotalCountID: number
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
};

const customerNkmModel = {
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
            const res: AxiosResponse<CustomerNkm[]> = await axios.get(`${baseUrlCustomerNakami}/getid`, { headers });
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
            const res: AxiosResponse<CustomerNkm[]> = await axios.get(`${baseUrlCustomerNakami}/count`, { headers });
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
            const res: AxiosResponse<CustomerNkm[]> = await axios.get(`${baseUrlCustomerNakami}/searchallcust/${search}`, { headers });
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
            const res: AxiosResponse<CustomerNkm[]> = await axios.get(
                `${baseUrlCustomerNakami}/GetAllbyCust/${Customer}`, { headers });
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
            const res: AxiosResponse<CustomerNkm[]> = await axios.get(
                `${baseUrlCustomerNakami}/getCurrent`, { headers });
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
            const res: AxiosResponse<CustomerNkm[]> = await axios.get(`${baseUrlCustomerNakami}/selecttop`, { headers });
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    },
    addIdCustomer: async (CustomerData: CustomerNkm) => {
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
                await axios.post(`${baseUrlCustomerNakami}/addcust`, CustomerData, { headers });
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}
export default customerNkmModel;