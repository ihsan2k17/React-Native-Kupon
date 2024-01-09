import { Animated, Easing } from "react-native";
import HadiahModel, { Hadiah } from "../models/hadiah";
import PeriodeModel, { Periode, periodeItem } from "../models/periode";
import React from "react";

export const FetchHadiahData = async (
    setHadiahData: React.Dispatch<React.SetStateAction<Hadiah[]>>,
    setGetError: React.Dispatch<React.SetStateAction<string>>,
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const data = await HadiahModel.getAllHadiah();
        setHadiahData(data);
    } catch (error) {
        console.log(error)
        setGetError(`Gagal Mengambil data`);
        setGetModalError(true)
    }
}

export const getperiodeDataHadiah = async (
    setPeriodeData: React.Dispatch<React.SetStateAction<periodeItem[]>>,
) => {
    try {
        const data = await PeriodeModel.selectPeriode();
        setPeriodeData(data)
    } catch (error) {
        throw error
    }
}
export const FetchPeriodeData = async (
    setHadiahData: React.Dispatch<React.SetStateAction<Hadiah[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const data = await HadiahModel.selectPeriode();
        setHadiahData(data);
    } catch (error) {
        console.log(error)
        setModal(true)
        setNotificationModal(`Gagal Mengambil data, ${error}`);
    }
}
export const FetchBarangPerPeriode = async (
    setHadiahData: React.Dispatch<React.SetStateAction<Hadiah[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    Periode: string
) => {
    try {
        const data = await HadiahModel.getHadiahPerPeriode(Periode);
        setHadiahData(data);
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Mengambil data`);
        setModal(true)
    }
}

export const fetchPoinPerBarang = async (
    barang: string,
    setHadiah: React.Dispatch<React.SetStateAction<number | undefined>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    try {
        const data = await HadiahModel.selectPoinByBarang(barang);
        if (data !== undefined && data.length > 0) {
            setHadiah(data[0].Poin_Hadiah);
        }
    } catch (error) {
        setModal(true);
        setModalType(`error-get-poin-by-barang`);
        setNotificationModal(`${error}`)
    }
}

export const FetchBarangPerPoin = async (
    setListNamaHadiah: React.Dispatch<React.SetStateAction<Hadiah[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    hadiah: number|undefined
) => {
    try {
        const data = await HadiahModel.getHadiahFindPoin(hadiah);
        setListNamaHadiah(data);
    } catch (error) {
        setNotificationModal(`Gagal Mengambil data, ${error}`);
        setModal(true)
    }
}

export const FetchPoinHadiah = async (
    setListPoinHadiah: React.Dispatch<React.SetStateAction<Hadiah[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await HadiahModel.getPoinHadiah();
        setListPoinHadiah(data);
    } catch (error) {
        console.log(`get poin hadiah error ${error}`);
        setNotificationModal(`Gagal Mengambil data`);
        setModal(true)
    }
}

export const FetchHadiahGetPeriode = async (
    setListPoinHadiah: React.Dispatch<React.SetStateAction<Hadiah[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await HadiahModel.getPeriode();
        setListPoinHadiah(data)
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Mengambil data, ${error}`);
        setModal(true)
    }
}

export const handleInputHadiah = async (
    hadiah: number,
    barang: string,
    periode: number,
    jenis: string,
    setNotification: React.Dispatch<React.SetStateAction<string>>
) => {
    const hadiahData: Hadiah = {
        Poin_Hadiah: hadiah,
        Barang: barang,
        Periode: periode,
        Jenis: jenis
    }
    try {
        const respon = await HadiahModel.addHadiah(hadiahData as Hadiah);
        setNotification(respon)
    } catch (error) {
        setNotification(`${error}`);
    }
}

export const UpdateHadiah = async (
    hadiah: number,
    barang: string,
    periode: number,
    jenis: string,
    hadiahBarang:string,
    setNotification: React.Dispatch<React.SetStateAction<string>>,
    setModal:React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const hadiahData: Hadiah = {
            Poin_Hadiah: hadiah,
            Barang: barang,
            Periode: periode,
            Jenis: jenis
        }
        const response = await HadiahModel.updatehadiah(hadiahBarang, hadiahData);
        setModal(true)
        setNotification(response)
    } catch (error) {
        setModal(true)
        setNotification(`${error}`);
    }
}

export const handletDeleteHadiah = async (
    Barang: string,
    setNotification: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const response = await HadiahModel.deleteHadiah(Barang);
        setNotification(response);
    } catch (error) {
        setNotification(`${error}`)
    }
}


export const handleRefreshHadiah = async (
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    setHadiahData: React.Dispatch<React.SetStateAction<Hadiah[]>>,
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
        await FetchHadiahData(setHadiahData, setGetError, setGetModalError)
        setRefreshRotation(new Animated.Value(0))
    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setRefresh(false);
};

