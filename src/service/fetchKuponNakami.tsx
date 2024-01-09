import React from "react";
import { Animated, Easing } from "react-native";
import KuponModelNakami, { KuponNKM } from "../models/kuponNakami";

export const FetchKuponNakamiData = async (
    setKuponData: React.Dispatch<React.SetStateAction<KuponNKM[]>>,
    setGetError: React.Dispatch<React.SetStateAction<string>>,
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const data = await KuponModelNakami.listKupon();
        setKuponData(data);
    } catch (error) {
        console.log(error);
        setGetError(`Gagal Memuat Data silahkan Cek Jaringan Anda`);
        setGetModalError(true);
    }
};


export const fetchDataKuponNakamiById = async (
    kuponId: number,
    kuponPoin: number,
    kuponTahun: number,
    kuponUser: string,
    kuponHadiah: number,
    kuponPeriode: number,
    setKuponData: React.Dispatch<React.SetStateAction<KuponNKM[]>>,
    setGetError: React.Dispatch<React.SetStateAction<string>>,
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const data = await KuponModelNakami.kuponGetId(kuponId, kuponPoin, kuponHadiah, kuponTahun, kuponUser, kuponPeriode);
        setKuponData(data);
        return data;
    } catch (error) {
        console.log(error);
        setGetError('Gagal Memuat Data');
        setGetModalError(true);
    }
};

export const handleSearchDetailKuponVoucherNakami = async (
    kuponId: number,
    kuponPoin: number,
    kuponNamaHadiah: string,
    setKuponData: React.Dispatch<React.SetStateAction<KuponNKM[]>>,
    setSearchKuponQuery: React.Dispatch<React.SetStateAction<string>>,
    searchKuponQuery: string
) => {
    try {
        const data = await KuponModelNakami.searchdetailKuponVoucher(kuponId, kuponPoin, kuponNamaHadiah, searchKuponQuery);
        setKuponData(data);
    } catch (error) {
        console.log('Error saat melakukan pencarian', error)
    }
};

export const handleRefreshDetailKuponVoucherNakami = async (
    setIsRefreshing: React.Dispatch<React.SetStateAction<boolean>>,
    kuponId: number,
    kuponPoin: number,
    kuponTahun: number,
    kuponUser: string,
    kuponHadiah: number,
    kuponPeriode: number,
    setKuponData: React.Dispatch<React.SetStateAction<KuponNKM[]>>,
    setGetError: React.Dispatch<React.SetStateAction<string>>,
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsRefreshing(true);
    try {
        const refresh = await fetchDataKuponNakamiById(
            kuponId,
            kuponPoin,
            kuponTahun,
            kuponUser,
            kuponHadiah,
            kuponPeriode,
            setKuponData,
            setGetError,
            setGetModalError);
        console.log(refresh)
        return refresh

    } catch (error) {
        console.log(error);
        setGetError('Gagal Memuat Data');
        setGetModalError(true);
    }
}

export const handleSearchKuponNakami = async (
    setKuponData: React.Dispatch<React.SetStateAction<KuponNKM[]>>,
    setSearchKuponQuery: React.Dispatch<React.SetStateAction<string>>,
    searchKuponQuery: string) => {
    try {
        const data = await KuponModelNakami.searchKupon(searchKuponQuery);
        setKuponData(data);
    } catch (error) {
        console.log('Error saat melakukan pencarian', error);
    }
};
export const fetchTahunHadiahNamaHadiahPeriodeJenisbyIDKuponNakami = async (
    id: number | undefined,
    setTahun: React.Dispatch<React.SetStateAction<number | undefined>>,
    setHadiah: React.Dispatch<React.SetStateAction<number | undefined>>,
    setNamaHadiah: React.Dispatch<React.SetStateAction<string>>,
    setPeriode: React.Dispatch<React.SetStateAction<number | undefined>>,
    setJenis: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        if (id !== undefined) {
            const data = await KuponModelNakami.kuponCekId(id);
            setTahun(data[0].Tahun);
            setHadiah(data[0].Hadiah);
            setNamaHadiah(data[0].Nama_Hadiah);
            setPeriode(data[0].Periode);
            setJenis(data[0].Jenis);
            return data;
        } else {
            setModal(true);
            setModalType('error-get-data-id');
            setNotificationModal('Gagal Mengambil data atau data tidak ada, id tidak valid');
        }
    } catch (error) {
        setModal(true);
        setModalType('error-get-data-id');
        setNotificationModal('Gagal Mengambil data atau data tidak ada, ' + error + '');
    }
}
export const handleInputKuponNakami = async (
    id: number | undefined,
    kupon: number | undefined,
    poin: number | undefined,
    tahun: number | undefined,
    hadiahke: number | undefined,
    hadiah: number | undefined,
    namahadiah: string,
    periode: number | undefined,
    jenis: string,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>
) => {
    const kuponData: KuponNKM = {
        ID: id,
        Poin: poin,
        Kupon: kupon,
        Hadiah: hadiah,
        Nama_Hadiah: namahadiah,
        Tahun: tahun,
        Periode: periode,
        Hadiah_ke: hadiahke,
        NamaCustomer: "",
        Voucher: 0,
        User_Input: "",
        Tanggal: "",
        Memo: "",
        Jenis: jenis,
        TotalPoin: 0,
        JumlahLembarKupon: 0,
        JumlahLembarVoucher: 0,
        Input_Duration: ""
    }
    try {
        await KuponModelNakami.inputKupon(kuponData as KuponNKM)
        setModal(true);
        setModalType('success-input-kupon')
        setNotificationModal(`Kupon ${kupon} Sukses Terinput`)
    } catch (error) {
        setModal(true);
        setModalType('error-input-kupon')
        setNotificationModal(`${error}`)
    }
};

export const handleUpDurKuponNakami = async (
    id: number | undefined,
    poin: number | undefined,
    kuponNakamiUser: string,
    hadiah: number | undefined,
    inputDuration:string,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    if (id !== undefined && poin !== undefined && hadiah !== undefined) {
        const data = {
            Input_Duration: inputDuration,
        };
        try {
            await KuponModelNakami.updateDuration(id, poin, kuponNakamiUser, hadiah, data);
            setModal(true);
            setModalType(`success-upduration`);
            setNotificationModal(`Durasi Input Kamu Telah Di catat, terimakasih`);
        } catch (error) {
            setModal(true);
            setModalType(`error-upduration`);
            setNotificationModal(`Jenis Error: ${error}`);
        }
    } else {
        console.log(`ID: ${id}, Poin: ${poin}, Hadiah: ${hadiah} , Update duration batal`)
    }
}

export const handleUpdateKuponNakami = async (
    kupon: number | undefined,
    hadiah: number | undefined,
    namahadiah: string,
    hadiahke: number | undefined,
    tahun: number | undefined,
    periode: number | undefined,
    kuponnakamiId: number | undefined,
    kuponnakamiPoin: number | undefined,
    kuponnakamiKupon: number | undefined,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const dataUpdate = {
        Kupon: kupon,
        Hadiah: hadiah,
        Nama_Hadiah: namahadiah,
        Hadiah_ke: hadiahke,
        Tahun: tahun,
        Periode: periode
    };
    try {
        await KuponModelNakami.updatekupon(kuponnakamiId, kuponnakamiPoin, kuponnakamiKupon, dataUpdate);
        setModal(true);
        setModalType(`success-update-kupon`)
        setNotificationModal(`Kupon ${dataUpdate.Kupon} dari ID ${kuponnakamiId} berhasil di ubah silahkan refresh`);
    } catch (error) {
        setModal(true)
        setModalType(`error-update-kupon`)
        setNotificationModal(`${error}`);
    }
};

export const handleDeleteKuponNakami = async (
    kuponId: number | undefined,
    kuponPoin: number | undefined,
    kuponKupon: number | undefined,
    setNotification: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const response = await KuponModelNakami.deleteKupon(kuponId, kuponPoin, kuponKupon);
        setNotification(response);
    } catch (error) {
        setNotification(`${error}`)
    }
};

export const handleInputVoucherNakami = async (
    id: number | undefined,
    voucher: number | undefined,
    poin: number | undefined,
    tahun: number | undefined,
    hadiahke: number | undefined,
    hadiah: number | undefined,
    namahadiah: string,
    periode: number | undefined,
    jenis: string,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>
) => {
    const kuponData: KuponNKM = {
        ID: id,
        Poin: poin,
        Voucher: voucher,
        Hadiah: hadiah,
        Nama_Hadiah: namahadiah,
        Tahun: tahun,
        Periode: periode,
        Hadiah_ke: hadiahke,
        NamaCustomer: "",
        Kupon: 0,
        User_Input: "",
        Tanggal: "",
        Memo: "",
        Jenis: jenis,
        TotalPoin: 0,
        JumlahLembarKupon: 0,
        JumlahLembarVoucher: 0,
        Input_Duration: ""
    }
    try {
        await KuponModelNakami.inputVoucher(kuponData as KuponNKM)
        setModal(true);
        setModalType('success-input-kupon')
        setNotificationModal(`Kupon ${voucher} Sukses Terinput`)
    } catch (error) {
        setModal(true);
        setModalType('error-input-voucher')
        setNotificationModal(`Ada Kesalahan saat menginput data, ${error}`)
    }
};

export const handleUpdateVoucherNakami = async (
    voucher: number | undefined,
    hadiah: number | undefined,
    namahadiah: string,
    hadiahke: number | undefined,
    tahun: number | undefined,
    periode: number | undefined,
    kuponnakamiId: number | undefined,
    kuponnakamiPoin: number | undefined,
    kuponnakamiVoucher: number | undefined,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const dataUpdate = {
        Voucher: voucher,
        Hadiah: hadiah,
        Nama_Hadiah: namahadiah,
        Hadiah_ke: hadiahke,
        Tahun: tahun,
        Periode: periode
    };
    try {
        await KuponModelNakami.updatevoucher(kuponnakamiId, kuponnakamiPoin, kuponnakamiVoucher, dataUpdate);
        setModal(true);
        setModalType(`success-update-vcr`)
        setNotificationModal(`Voucher ${dataUpdate.Voucher} dari ID ${kuponnakamiId} berhasil di ubah silahkan refresh`);
    } catch (error) {
        setModal(true)
        setModalType(`error-update-vcr`)
        setNotificationModal(`${error}`);
    }
};

export const handleDeleteVoucherNakami = async (
    kuponId: number | undefined,
    kuponPoin: number | undefined,
    kuponVoucher: number | undefined,
    setNotification: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const response = await KuponModelNakami.deleteVoucher(kuponId, kuponPoin, kuponVoucher);
        setNotification(response);
    } catch (error) {
        setNotification(`${error}`)
    }
};

export const handleRefreshNakami = async (
    setIsRefreshing: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    kuponId: number | undefined,
    kuponPoin: number | undefined,
    kuponTahun: number|undefined,
    kuponUser: string|undefined,
    kuponHadiah: number|undefined,
    kuponPeriode: number|undefined,
    setKuponData: React.Dispatch<React.SetStateAction<KuponNKM[]>>,
    setGetError: React.Dispatch<React.SetStateAction<string>>,
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsRefreshing(true);
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
        if (
            kuponId !== undefined &&
            kuponPoin !== undefined &&
            kuponTahun !== undefined &&
            kuponUser !== undefined &&
            kuponHadiah !== undefined &&
            kuponPeriode !== undefined) {
            await fetchDataKuponNakamiById(kuponId, kuponPoin,kuponTahun, kuponUser, kuponHadiah, kuponPeriode, setKuponData, setGetError, setGetModalError);
        }
        setRefreshRotation(new Animated.Value(0))

    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setIsRefreshing(false);
};

export const handleRefreshListKuponNakami = async (
    setIsRefreshing: React.Dispatch<React.SetStateAction<boolean>>,
    refreshAnimation: Animated.Value,
    refreshRotation: Animated.Value,
    setRefreshRotation: React.Dispatch<React.SetStateAction<Animated.Value>>,
    setKuponData: React.Dispatch<React.SetStateAction<KuponNKM[]>>,
    setGetError: React.Dispatch<React.SetStateAction<string>>,
    setGetModalError: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setIsRefreshing(true);
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
        await FetchKuponNakamiData(setKuponData, setGetError, setGetModalError);
        setRefreshRotation(new Animated.Value(0))

    } catch (error) {
        console.log('Error saat merefresh data:', error);
    }
    setIsRefreshing(false);
};