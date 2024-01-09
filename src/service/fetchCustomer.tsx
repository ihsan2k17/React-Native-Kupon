import { Animated, Easing } from "react-native";
import CustomerModel, { Customer } from "../models/customer";
import React from "react";

export const FetchCustomerListId = async (
    setListID: React.Dispatch<React.SetStateAction<Customer[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await CustomerModel.listId();
        setListID(data);
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Memuat Data silahkan Cek Jaringan Anda, ${error}`);
        setModal(true);
    }
};

export const handleSearchCustomer = async (
    searching: string,
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>
) => {
    try {
        const data = await CustomerModel.searchAllCust(searching);
        setCustomerData(data);
    } catch (error) {
        console.log('Error saat melakukan pencarian', error);
    }
}

export const FetchCustomerTotalIdCustomer = async(
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
    setModalCustomer: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await CustomerModel.TotalIdCustomer();
        setCustomerData(data);
    } catch (error) {
        console.log(error);
        setNotificationModalCustomer(`Gagal Memuat Data silahkan Cek Jaringan Anda, ${error}`);
        setModalCustomer(true);
    }
}

export const handlelistNamabyCustomer = async(
    Customer: string,
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
    setModalCustomer: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await CustomerModel.listNamabyCustomer(Customer);
        setCustomerData(data)
    } catch (error) {
        console.log(error);
        setNotificationModalCustomer(`Gagal Memuat Data silahkan Cek Jaringan Anda`);
        setModalCustomer(true);
    }
}

export const FetchCustomerlistNamabyCustomer = async (
    customerCustomer: string,
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
    setModalCustomer: React.Dispatch<React.SetStateAction<boolean>>
):Promise<void> => {
    try {
        const data = await CustomerModel.listNamabyCustomer(customerCustomer);
        setCustomerData(data)
    } catch (error) {
        console.log(error);
        setNotificationModalCustomer(`Gagal Memuat Data silahkan Cek Jaringan Anda, ${error}`);
        setModalCustomer(true);
    }
}
export const fetchCurrentListNamaByCustomer = async(
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType:React.Dispatch<React.SetStateAction<string>>
):Promise<void> => {
    try {
        const data = await CustomerModel.listCurrentCustomerbyCustomer();
        setCustomerData(data)
    } catch (error) {
        console.log(error);
        setModal(true);
        setModalType('current-list-error')
        setNotificationModalCustomer(`Gagal Memuat Data silahkan Cek Jaringan Anda, ${error}`);
    }
}

export const SelectTopIdCustomer = async (
    setID: React.Dispatch<React.SetStateAction<Customer[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const data = await CustomerModel.selectIdNew();
        setID(data);
        return data
    } catch (error) {
        setNotificationModal(`Gagal Memuat Data silahkan Cek Jaringan Anda, ${error}`);
        setModalType('error-select-top-customer-id')
        setModal(true);
        throw error
    }
};

export const AddDataCustomer = async(
    IDCust: number,
    customer: string,
    namaCustomer: string,
    alamat: string,
    hp: string,
    wa: string,
    email: string,
    idAgen: string,
    salesId: string,
    kota: string,
    jenis: string,
    keterangan: string,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
) => {
    const customerData: Customer = {
        TotalCountID: 0,
        ID: IDCust,
        Customer: customer,
        Nama: namaCustomer,
        Alamat: alamat,
        HP: hp,
        Email: email,
        AgenId: idAgen,
        Status: "",
        SalesId: salesId,
        Kota: kota,
        Whatsapp: wa,
        Keterangan: keterangan,
        Jenis: jenis,
        User_Input: ""
    }
    try {
        const add = await CustomerModel.addIdCustomer(customerData);
        console.log(add)
        setModal(true)
        setModalType('success-add-customer')
        setNotificationModal(`${IDCust} Berhasil Di tambah`)
    } catch (error) {
        console.log(error)
        setModal(true);
        setNotificationModal(`Ada Kesalahan saat menginput data, jenis error nya: ${error}. 
        Tanyakan pada tim it untuk menyelesaikan nya`);
        setModalType('error-add-customer')
    }
}

export const handleRefresh = async (
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    customerCustomer: string,
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
    setModalCustomer: React.Dispatch<React.SetStateAction<boolean>>
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
        if (customerCustomer !== undefined) {
            await FetchCustomerlistNamabyCustomer(customerCustomer, setCustomerData, setNotificationModalCustomer, setModalCustomer)
        }
        setRefreshRotation(new Animated.Value(0))
    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setRefresh(false);
};

export const handleRefreshCurrent = async (
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
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
        if (setCustomerData !== undefined) {
            await fetchCurrentListNamaByCustomer(setCustomerData,
                setNotificationModalCustomer,
                setModal, setModalType)
        }
        setRefreshRotation(new Animated.Value(0))
    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setRefresh(false);
};
export const handleRefreshCount = async (
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    setCustomerData: React.Dispatch<React.SetStateAction<Customer[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
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
        if (setCustomerData !== undefined) {
            await FetchCustomerTotalIdCustomer(setCustomerData, setNotificationModalCustomer, setModal)
        }
        setRefreshRotation(new Animated.Value(0))
    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setRefresh(false);
};
