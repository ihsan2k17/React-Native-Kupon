import AsyncStorage from "@react-native-async-storage/async-storage"
import axios, { AxiosResponse } from "axios";
import { baseUrlKuponNakami } from "./baseUrl";

export interface KuponNKM {
    ID?: number,
    NamaCustomer: string,
    Poin?: number,
    Kupon?: number,
    Voucher?: number,
    Hadiah?: number,
    Nama_Hadiah: string,
    Hadiah_ke?: number,
    Tahun?: number,
    User_Input: string,
    Tanggal: string,
    Periode?: number,
    Memo: string,
    Jenis: string,
    Input_Duration: string,
    TotalPoin?: number,
    JumlahLembarKupon?: number,
    JumlahLembarVoucher?: number
}

const KuponModelNakami = {
    listKupon: async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan, login ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<KuponNKM[]> = await axios.get(`${baseUrlKuponNakami}/list`, { headers });
            return res.data;
        } catch (error) {
            console.log(`Gagal Muat Data, Harap Periksa Jaringan Anda`);
            throw error;
        }
    },
    searchKupon: async (search: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<KuponNKM[]> = await axios.get(
                `${baseUrlKuponNakami}/search/${search}`, { headers })
            return res.data
        } catch (error: any) {
            throw new Error("Gagal Memuat Data, " + error.response.data.message + "");
        }
    },
    searchdetailKuponVoucher: async (ID: number, Poin: number, Nama_Hadiah: string, search: string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<KuponNKM[]> = await axios.get(`
            ${baseUrlKuponNakami}/SearchKuponVoucher/${ID}/${Poin}/${Nama_Hadiah}/${search}`, { headers })
            return res.data
        } catch (error: any) {
            throw new Error("Gagal Memuat Data, " + error.response.data.message + "");
        }
    },
    kuponGetId: async (ID: number, Poin: number, Hadiah: number, Tahun: number, User_Input: string, Periode: number) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<KuponNKM[]> = await axios.get(
                `${baseUrlKuponNakami}/listid/${ID}/${Poin}/${Hadiah}/${Tahun}/${User_Input}/${Periode}`, { headers })
            return res.data
        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    },

    kuponCekId: async (ID: number) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<KuponNKM[]> = await axios.get(
                `${baseUrlKuponNakami}/cekId/${ID}`, { headers })
            return res.data
        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    },
    inputKupon: async (kuponData: KuponNKM) => {
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
                await axios.post(`${baseUrlKuponNakami}/inputKupon`, kuponData, { headers });
            return res.data;
        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    },
    inputVoucher: async (kuponData: KuponNKM) => {
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
                await axios.post(`${baseUrlKuponNakami}/inputvoucher`, kuponData, { headers });
            return res.data;
        } catch (error: any) {
            throw new Error(error.response.data.message);
        }
    },
    updatekupon: async (
        ID: number | undefined,
        Poin: number | undefined,
        Kuponold: number | undefined,
        entity: {
            Kupon?: number,
            Hadiah?: number,
            Nama_Hadiah: string,
            Hadiah_ke?: number,
            Tahun?: number,
            Periode?: number,
        }) => {
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
                await axios.put(`${baseUrlKuponNakami}/UpdateKupon/${ID}/${Poin}/${Kuponold}`, entity, { headers });
            if (res.status === 201) {
                return res.data.message
            } else if (res.status === 401) {
                return res.data.message
            }
        } catch (error: any) {
            console.error(`error kupon model`, error.message);
            throw new Error(`${error.message}`);
        }
    },
    updateDuration: async(
        ID: number | undefined,
        Poin: number | undefined,
        User_Input: string,
        Hadiah: number | undefined,
        entity: {
            Input_Duration: string
        }
    ) => {
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
                await axios.put(`${baseUrlKuponNakami}/updur/${ID}/${Poin}/${User_Input}/${Hadiah}`, entity, { headers });
            if (res.status === 201) {
                return res.data.message
            } else if (res.status === 401) {
                return res.data.message
            }
        } catch (error:any) {
            console.error(`error kupon model`, error.message);
            throw new Error(`${error.message}`);
        }
    },
    updatevoucher: async (
        ID: number | undefined,
        Poin: number | undefined,
        voucherold: number | undefined,
        entity: {
            Voucher?: number,
            Hadiah?: number,
            Nama_Hadiah: string,
            Hadiah_ke?: number,
            Tahun?: number,
            Periode?: number,
        }) => {
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
                await axios.put(`${baseUrlKuponNakami}/UpdateVoucher/${ID}/${Poin}/${voucherold}`, entity, { headers });
            if (res.status === 201) {
                return res.data.message
            } else if (res.status === 401) {
                return res.data.message
            }
        } catch (error: any) {
            console.error(`error kupon model`, error.message);
            throw new Error(`${error.message}`);
        }
    },
    deleteKupon: async (
        ID: number | undefined,
        Poin: number | undefined,
        Kupon: number | undefined
    ) => {
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
                await axios.delete(`${baseUrlKuponNakami}/DeleteKupon/${ID}/${Poin}/${Kupon}`, { headers });
            if (res.status === 202) {
                return res.data.message
            } else if (res.status === 402) {
                return res.data.message
            }
        } catch (error: any) {
            console.error(`error kupon model`, error.message);
            throw new Error(`${error.message}`);
        }
    },
    deleteVoucher: async (
        ID: number | undefined,
        Poin: number | undefined,
        Voucher: number | undefined
    ) => {
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
                await axios.delete(`${baseUrlKuponNakami}/DeleteVoucher/${ID}/${Poin}/${Voucher}`, { headers });
            if (res.status === 202) {
                return res.data.message
            } else if (res.status === 402) {
                return res.data.message
            }
        } catch (error: any) {
            console.error(`error kupon model`, error.message);
            throw new Error(`${error.message}`);
        }
    }
}

export default KuponModelNakami;