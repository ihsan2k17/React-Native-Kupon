import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { baseUrlHadiahNakami, baseurlPeriode } from "./baseUrl";

export interface HadiahNKM {
    Poin_Hadiah: number;
    Barang: string;
    Periode: number;
    Jenis: string;
}


const HadiahModelNKM = {
    getAllHadiah: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<HadiahNKM[]> = await axios.get(`${baseUrlHadiahNakami}/GetAll`, { headers });
            return res.data;
        } catch (error) {
            console.log('Gagal Memuat Data');
            throw error;
        }
    },
    getPeriode: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<HadiahNKM[]> = await axios.get(`${baseUrlHadiahNakami}/GetPeriode`, { headers });
            return res.data;
        } catch (error) {
            console.log('Gagal Memuat Data');
            throw error;
        }
    },
    selectPeriode: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<HadiahNKM[]> = await axios.get(`${baseurlPeriode}/getall`, { headers });
            return res.data;
        } catch (error) {
            console.log('Gagal Memuat Data');
            throw error;
        }
    },
    selectPoinByBarang: async (Barang: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse = await axios.get(`${baseUrlHadiahNakami}/getpoinbybarang/${Barang}`, { headers });
            return res.data;
        } catch (error: any) {
            //console.log(`Gagal memuat Data ${error}`);
            throw new error(`${error.response.data.message}`);
        }
    },
    getHadiahPerPeriode: async (periode: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<HadiahNKM[]> =
                await axios.get(`${baseUrlHadiahNakami}/GetBarangHadiahPerPeriode/${periode}`, { headers });
            return res.data;
        } catch (error: any) {
            throw new Error(`${error.response.data.message}`)
        }
    },
    getPoinHadiah: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<HadiahNKM[]> = await axios.get(`${baseUrlHadiahNakami}/getpoinhadiah`, { headers });
            return res.data;
        } catch (error: any) {
            throw new Error(`${error.response.data.message}`)
        }
    },
    getHadiahFindPoin: async (Poin_Hadiah: number | undefined) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<HadiahNKM[]> = await axios.get(`${baseUrlHadiahNakami}/gethadiahfindpoin/${Poin_Hadiah}`, { headers });
            return res.data;
        } catch (error: any) {
            throw new Error(`Hadiah belum Dimasukan, ${error.response.data.message}`)
        }
    },
    addHadiah: async (entity: HadiahNKM) => {
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
                await axios.post(`${baseUrlHadiahNakami}/addhadiah`, entity, { headers });
            return res.data.message;
        } catch (error: any) {
            throw new Error(`${error.message}`)
        }
    },
    updatehadiah: async (Barangold: string, entity: HadiahNKM) => {
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
                await axios.put(`${baseUrlHadiahNakami}/UpdateHadiah/${Barangold}`, entity, { headers });
            if (res.status === 201) {
                return res.data.message
            } else if (res.status === 401) {
                return res.data.message
            }
        } catch (error: any) {
            throw new Error(`${error.message}`);
        }
    },
    deleteHadiah: async (Barang: string) => {
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
                await axios.delete(`${baseUrlHadiahNakami}/delete/${Barang}`, { headers });
            if (res.status === 202) {
                return res.data.message
            } else if (res.status === 402) {
                return res.data.message
            }
        } catch (error: any) {
            throw new Error(`${error.message}`)
        }
    },
}

export default HadiahModelNKM;
