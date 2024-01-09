import { Animated, Easing } from "react-native";
import customerNkmModel, { CustomerNkm } from "../models/customerNakami";

export const FetchCustomerNKMListId = async (
    setListID: React.Dispatch<React.SetStateAction<CustomerNkm[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await customerNkmModel.listId();
        setListID(data);
    } catch (error) {
        console.log(error);
        setNotificationModal(`Gagal Memuat Data silahkan Cek Jaringan Anda, ${error}`);
        setModal(true);
    }
};

export const handleSearchCustomerNKM = async (
    searching: string,
    setSearching: React.Dispatch<React.SetStateAction<string>>,
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerNkm[]>>
) => {
    try {
        const data = await customerNkmModel.searchAllCust(searching);
        setCustomerData(data);
    } catch (error) {
        console.log('Error saat melakukan pencarian', error);
    }
}

export const FetchCustomerNKMTotalIdCustomer = async (
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerNkm[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
    setModalCustomer: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await customerNkmModel.TotalIdCustomer();
        setCustomerData(data);
    } catch (error) {
        console.log(error);
        setNotificationModalCustomer(`Gagal Memuat Data silahkan Cek Jaringan Anda, ${error}`);
        setModalCustomer(true);
    }
}

export const handlelistNamabyCustomerNKM = async (
    Customer: string,
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerNkm[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
    setModalCustomer: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await customerNkmModel.listNamabyCustomer(Customer);
        setCustomerData(data)
    } catch (error) {
        console.log(error);
        setNotificationModalCustomer(`Gagal Memuat Data silahkan Cek Jaringan Anda`);
        setModalCustomer(true);
    }
}

export const FetchCustomerNKMlistNamabyCustomer = async (
    customernakamiCustomer: string,
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerNkm[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
    setModalCustomer: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
    try {
        const data = await customerNkmModel.listNamabyCustomer(customernakamiCustomer);
        setCustomerData(data)
    } catch (error) {
        console.log(error);
        setNotificationModalCustomer(`Gagal Memuat Data silahkan Cek Jaringan Anda, ${error}`);
        setModalCustomer(true);
    }
}
export const fetchCurrentListNamaByCustomerNKM = async (
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerNkm[]>>,
    setNotificationModalCustomer: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
    try {
        const data = await customerNkmModel.listCurrentCustomerbyCustomer();
        setCustomerData(data)
    } catch (error) {
        console.log(error);
        setModal(true);
        setModalType('current-list-error')
        setNotificationModalCustomer(`Gagal Memuat Data silahkan Cek Jaringan Anda, ${error}`);
    }
}

export const SelectTopIdCustomerNKM = async (
    setID: React.Dispatch<React.SetStateAction<CustomerNkm[]>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const data = await customerNkmModel.selectIdNew();
        setID(data);
        return data
    } catch (error) {
        setNotificationModal(`Gagal Memuat Data silahkan Cek Jaringan Anda, ${error}`);
        setModalType('error-select-top-customer-id')
        setModal(true);
        throw error
    }
};

export const AddDataCustomerNKM = async (
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
    const customerData: CustomerNkm = {
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
        const add = await customerNkmModel.addIdCustomer(customerData);
        console.log(add)
        setModal(true)
        setModalType('success-add-customerNakami')
        setNotificationModal(`${IDCust} Berhasil Di tambah`)
    } catch (error) {
        console.log(error)
        setModal(true);
        setNotificationModal(`Ada Kesalahan saat menginput data, jenis error nya: ${error}. 
        Tanyakan pada tim it untuk menyelesaikan nya`);
        setModalType('error-add-customerNakami')
    }
}

export const handleRefreshNKM = async (
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    customerCustomer: string,
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerNkm[]>>,
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
            await FetchCustomerNKMlistNamabyCustomer(customerCustomer, setCustomerData, setNotificationModalCustomer, setModalCustomer)
        }
        setRefreshRotation(new Animated.Value(0))
    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setRefresh(false);
};

export const handleRefreshCurrentCustNKM = async (
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerNkm[]>>,
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
            await fetchCurrentListNamaByCustomerNKM(setCustomerData,
                setNotificationModalCustomer,
                setModal, setModalType)
        }
        setRefreshRotation(new Animated.Value(0))
    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setRefresh(false);
};
export const handleRefreshCountCustNKM = async (
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    setCustomerData: React.Dispatch<React.SetStateAction<CustomerNkm[]>>,
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
            await FetchCustomerNKMTotalIdCustomer(setCustomerData, setNotificationModalCustomer, setModal)
        }
        setRefreshRotation(new Animated.Value(0))
    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setRefresh(false);
};