import HadiahModelNKM, { HadiahNKM } from "../models/hadiahNakami";
import PeriodeModel, { periodeItem } from "../models/periode";
import { Animated, Easing } from "react-native";

export const FetchHadiahDataNKM = async (
    setHadiahData: React.Dispatch<React.SetStateAction<HadiahNKM[]>>,
    setGetError: React.Dispatch<React.SetStateAction<string>>,
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const data = await HadiahModelNKM.getAllHadiah();
        setHadiahData(data);
    } catch (error) {
        console.log(error)
        setGetError(`Gagal Mengambil data`);
        setGetModalError(true)
    }
}

export const getperiodeDataHadiahNKM = async (
    setPeriodeData: React.Dispatch<React.SetStateAction<periodeItem[]>>,
) => {
    try {
        const data = await PeriodeModel.selectPeriode();
        setPeriodeData(data)
    } catch (error) {
        throw error
    }
}
export const FetchPeriodeDataNKM = async (
    setHadiahData: React.Dispatch<React.SetStateAction<HadiahNKM[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const data = await HadiahModelNKM.selectPeriode();
        setHadiahData(data);
    } catch (error) {
        console.log(error)
        setModal(true)
        setNotificationModal(`Gagal Mengambil data, ${error}`);
    }
}
export const FetchBarangPerPeriodeNKM = async (
    setHadiahData: React.Dispatch<React.SetStateAction<HadiahNKM[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    Periode: string
) => {
    try {
        const data = await HadiahModelNKM.getHadiahPerPeriode(Periode);
        setHadiahData(data);
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Mengambil data`);
        setModal(true)
    }
}

export const fetchPoinPerBarangNKM = async (
    barang: string,
    setHadiah: React.Dispatch<React.SetStateAction<number | undefined>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    try {
        const data = await HadiahModelNKM.selectPoinByBarang(barang);
        if (data !== undefined && data.length > 0) {
            setHadiah(data[0].Poin_Hadiah);
        }
    } catch (error) {
        setModal(true);
        setModalType(`error-get-poin-by-barang`);
        setNotificationModal(`${error}`)
    }
}

export const FetchBarangPerPoinNKM = async (
    setListNamaHadiah: React.Dispatch<React.SetStateAction<HadiahNKM[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    hadiah: number | undefined
) => {
    try {
        const data = await HadiahModelNKM.getHadiahFindPoin(hadiah);
        setListNamaHadiah(data);
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Mengambil data, ${error}`);
        setModal(true)
    }
}

export const FetchPoinHadiahNKM = async (
    setListPoinHadiah: React.Dispatch<React.SetStateAction<HadiahNKM[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await HadiahModelNKM.getPoinHadiah();
        setListPoinHadiah(data);
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Mengambil data`);
        setModal(true)
    }
}

export const FetchHadiahGetPeriodeNKM = async (
    setListPoinHadiah: React.Dispatch<React.SetStateAction<HadiahNKM[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await HadiahModelNKM.getPeriode();
        setListPoinHadiah(data)
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Mengambil data, ${error}`);
        setModal(true)
    }
}

export const handleInputHadiahNKM = async (
    hadiah: number,
    barang: string,
    periode: number,
    jenis: string,
    setNotification: React.Dispatch<React.SetStateAction<string>>
) => {
    const hadiahData: HadiahNKM = {
        Poin_Hadiah: hadiah,
        Barang: barang,
        Periode: periode,
        Jenis: jenis
    }
    try {
        const respon = await HadiahModelNKM.addHadiah(hadiahData as HadiahNKM);
        setNotification(respon)
    } catch (error) {
        setNotification(`${error}`);
    }
}

export const UpdateHadiahNKM = async (
    hadiah: number,
    barang: string,
    periode: number,
    jenis: string,
    hadiahNakamiBarang: string,
    setNotification: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const hadiahData: HadiahNKM = {
            Poin_Hadiah: hadiah,
            Barang: barang,
            Periode: periode,
            Jenis: jenis
        }
        const response = await HadiahModelNKM.updatehadiah(hadiahNakamiBarang, hadiahData);
        setModal(true)
        setNotification(response)
    } catch (error) {
        setModal(true)
        setNotification(`${error}`);
    }
}

export const handletDeleteHadiahNKM = async (
    Barang: string,
    setNotification: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const response = await HadiahModelNKM.deleteHadiah(Barang);
        setNotification(response);
    } catch (error) {
        setNotification(`${error}`)
    }
}


export const handleRefreshHadiahNKM = async (
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    setHadiahData: React.Dispatch<React.SetStateAction<HadiahNKM[]>>,
    setGetError: React.Dispatch<React.SetStateAction<string>>,
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setRefresh(true);
    Animated.sequence([
        Animated.timing(refreshAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }),
        Animated.timing(refreshAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
        }),
    ]).start();
    Animated.loop(
        Animated.timing(refreshRotation, {
            toValue: 1, // misalnya, untuk 360 derajat
            duration: 1000, // durasi rotasi dalam milidetik
            easing: Easing.linear,
            useNativeDriver: false,
        })
    ).start();
    try {
        await FetchHadiahDataNKM(setHadiahData, setGetError, setGetModalError)
        setRefreshRotation(new Animated.Value(0))
    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setRefresh(false);
};