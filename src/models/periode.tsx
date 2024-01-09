import axios, { AxiosResponse } from "axios";
import { baseurlPeriode } from "./baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Periode {
    periode:number
}

export interface periodeItem {
    Periode: string
}
const PeriodeModel = {
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
            const res: AxiosResponse<periodeItem[]> = await axios.get(`${baseurlPeriode}/getall`, { headers });
            return res.data;
        } catch (error) {
            console.log('Gagal Memuat Data');
            throw error;
        }
    },
}

export default PeriodeModel