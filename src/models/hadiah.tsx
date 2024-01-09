import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { baseUrlHadiah, baseurlPeriode } from "./baseUrl";
import { err } from "react-native-svg/lib/typescript/xml";

export interface Hadiah {
    Poin_Hadiah: number;
    Barang: string;
    Periode: number;
    Jenis: string;
}


const HadiahModel = {
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
            const res: AxiosResponse<Hadiah[]> = await axios.get(`${baseUrlHadiah}/GetAll`, { headers });
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
            const res: AxiosResponse<Hadiah[]> = await axios.get(`${baseUrlHadiah}/GetPeriode`, { headers });
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
            const res: AxiosResponse<Hadiah[]> = await axios.get(`${baseurlPeriode}/getall`, { headers });
            return res.data;
        } catch (error) {
            console.log('Gagal Memuat Data');
            throw error;
        }
    },
    selectPoinByBarang: async (Barang:string) => {
      try {
          const token = await AsyncStorage.getItem('token');
          if (!token) {
              console.log('token tidak ditemukan. Harap Login Ulang');
              return [];
          }
          const headers = {
              Authorization: `Bearer ${token}`
          }
          const res: AxiosResponse = await axios.get(`${baseUrlHadiah}/getpoinbybarang/${Barang}`, { headers });
          return res.data;
      } catch (error:any) {
          //console.log(`Gagal memuat Data ${error}`);
          throw new error(`${error.response.data.message}`);
      }  
    },
    getHadiahPerPeriode:async (periode:string) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Hadiah[]> =
                await axios.get(`${baseUrlHadiah}/GetBarangHadiahPerPeriode/${periode}`, { headers });
            return res.data;
        } catch (error:any) {
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
          const res: AxiosResponse<Hadiah[]> = await axios.get(`${baseUrlHadiah}/getpoinhadiah`, { headers });
          return res.data;
      } catch (error:any) {
          throw new Error(`${error.response.data.message}`)
      }  
    },
    getHadiahFindPoin: async (Poin_Hadiah: number|undefined) => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.log('token tidak ditemukan. Harap Login Ulang');
                return [];
            }
            const headers = {
                Authorization: `Bearer ${token}`
            }
            const res: AxiosResponse<Hadiah[]> = await axios.get(`${baseUrlHadiah}/gethadiahfindpoin/${Poin_Hadiah}`, { headers });
            return res.data;
        } catch (error:any) {
            throw new Error(`Hadiah belum Dimasukan, ${error.response.data.message}`)
        }
    },
    addHadiah: async (entity: Hadiah) => {
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
                await axios.post(`${baseUrlHadiah}/addhadiah`, entity, { headers });
            return res.data.message;
        } catch (error:any) {
            throw new Error(`${error.message}`)
        }
    },
    updatehadiah: async (Barangold: string, entity: Hadiah) => {
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
                await axios.put(`${baseUrlHadiah}/UpdateHadiah/${Barangold}`, entity, { headers });
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
                await axios.delete(`${baseUrlHadiah}/delete/${Barang}`, { headers });
            if (res.status === 202) {
                return res.data.message
            } else if(res.status === 402){
                return res.data.message
            }
        } catch (error: any) {
            throw new Error(`${error.message}`)
        }
    },
    
}

export default HadiahModel;
