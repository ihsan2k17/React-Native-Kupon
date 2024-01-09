import AgenModel, { Agen } from '../models/agen'
import { Animated, Easing } from "react-native";
import React from "react";
import { ScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

export const FetchAgen = async (
    setAgenData: React.Dispatch<React.SetStateAction<Agen[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await AgenModel.ListAgen();
        setAgenData(data);
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Mengambil data`);
        setModal(true)
    }
} 

export const FetchListNamaAgen = async (
    setListNamaAgen: React.Dispatch<React.SetStateAction<Agen[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await AgenModel.ListAgenByNama();
        setListNamaAgen(data);
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Mengambil data`);
        setModal(true)
    }
}

export const FetchKotaAgen = async (
    setListKota: React.Dispatch<React.SetStateAction<Agen[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const data = await AgenModel.ListKotaAgen();
        setListKota(data);
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Mengambil data, ${error}`);
    }
}

export const searchListNameAgen = async (
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
    setListNamaAgen: React.Dispatch<React.SetStateAction<Agen[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const data = await AgenModel.searchAgenByNama(searchQuery);
        setListNamaAgen(data);
    } catch (error) {
        setModal(true);
        setModalType('error-search');
        setNotificationModal('Search Error: ' + error + 'Silahkan Refresh');
    }
}
export const searchAgen = async (
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
    setListNamaAgen: React.Dispatch<React.SetStateAction<Agen[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const data = await AgenModel.searchAgen(searchQuery);
        setListNamaAgen(data);
    } catch (error) {
        setModal(true);
        setModalType('error-search');
        setNotificationModal('Search Error: ' + error + 'Silahkan Refresh');
    }
}

export const FetchListIdAgen = async(
    setIdAgen: React.Dispatch<React.SetStateAction<string>>,
    setSalesId: React.Dispatch<React.SetStateAction<string>>,
    customer: string,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const data = await AgenModel.ListAgenFindNama(customer);
        setIdAgen(data[0].AgenID);
        setSalesId(data[0].SalesID)
        return data;
    } catch (error) {
        setModal(true);
        setModalType('error-get-id');
        setNotificationModal('Gagal Mengambil data, ' + error + '');
    }
}
export const FecthListIdAgenSalesKota = async (
    customer:string,
    setIdAgen: React.Dispatch<React.SetStateAction<string>>,
    setSalesId: React.Dispatch<React.SetStateAction<string>>,
    setKota: React.Dispatch<React.SetStateAction<string>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const data = await AgenModel.ListAgenFindNama(customer);
        setIdAgen(data[0].AgenID);
        setSalesId(data[0].SalesID);
        setKota(data[0].Kota);
        return data
    } catch (error) {
        setModal(true);
        setModalType('error-get-id-sales-kota');
        setNotificationModal('Gagal Mengambil data, ' + error + '');
    }
}


export const CreateAgen = async (
    agenId: string,
    agenName: string,
    kota: string,
    salesId: string,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
) => {
    const agenQuery: Agen = {
        AgenID: agenId,
        Agen_Name: agenName,
        Kota: kota,
        SalesID: salesId,
        Sales_Name: ''
    }
    try {
        const add = await AgenModel.AddAgen(agenQuery);
        console.log(add)
        setModal(true)
        setModalType('success-add-agen')
        setNotificationModal(`${agenName} Berhasil Di tambah`)
    } catch (error) {
        console.log(error)
        setModal(true);
        setNotificationModal(`Ada Kesalahan saat menginput data, jenis error nya: ${error}. 
        Tanyakan pada tim it untuk menyelesaikan nya`);
        setModalType('error-add-agen')
    }
};

export const handleRefreshAgen = async (
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    setAgenData: React.Dispatch<React.SetStateAction<Agen[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
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
        if (setAgenData !== undefined) {
            await FetchAgen(setAgenData, setNotificationModal, setModal)
        }
        setRefreshRotation(new Animated.Value(0))
    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setRefresh(false);
};