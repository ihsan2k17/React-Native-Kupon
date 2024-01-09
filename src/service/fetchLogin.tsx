
import React from 'react';
import LoginModel, { Login } from '../models/login';

export const cekuserLogin = async (
    setDataUser: React.Dispatch<React.SetStateAction<Login | null>>,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        const data = await LoginModel.profile();
        setDataUser(data ?? null)
    } catch (error) {
        setNotificationModal(`Gagal Memuat Data, ${error}`)
    }
}

export const fetchProfileData = async (
    setProfileData: React.Dispatch<React.SetStateAction<Login | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setAlert: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        const data = await LoginModel.profile();
        setProfileData(data ?? null);
        setLoading(false)
    } catch (error) {
        setLoading(false);
        setAlert('Gagal Memuat Data, ' + error + '');
        throw error;
    }
};

export const fetchallUser = async (
    setUserData: React.Dispatch<React.SetStateAction<Login[] | null>>,
    setAlert: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        const data = await LoginModel.allUser();
        setUserData(data ?? null);
    } catch (error) {
        setAlert('Gagal Memuat Data, ' + error + '');
        throw error;
    }
};

export const fetchLastLogin = async(
    pc: string,
    version: string,
    setNotification: React.Dispatch<React.SetStateAction<string>>,
) => {
    const lastDatalogin = {
        PC: pc,
        Version: version
    };
    try {
        await LoginModel.lastLogin(lastDatalogin);
        setNotification('Last Login Has Modified');
    } catch (error) {
        setNotification('Last Login Not Modified')
    }
}

export const handlLastExitApps = async (
    setNotification: React.Dispatch<React.SetStateAction<string>>,
) => {
    try {
        await LoginModel.lastLogout()
        setNotification('Exit Apps Kupon');
    } catch (error) {
        setNotification(`Error Exit Apps Kupon`)
    }
} 

export const handleLogin = async (
    username: string,
    password: string,
    pc: string,
    version:string,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setLoginError: React.Dispatch<React.SetStateAction<string>>,
    setModalErrorLogin: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const loginData: Login = {
        Username: username,
        Password: password,
        token: '',
        ID: undefined,
        Role: '',
        Q1: '',
        Q2: '',
        Q3: '',
        Version: version,
        PC: pc,
        Status: '',
        Input_Duration: ''
    };
    
    if (!username) {
        setLoginError('Username tidak boleh Kosong');
        setModalErrorLogin(true);
        return
    }

    if (!password) {
        setLoginError('Password tidak boleh Kosong');
        setModalErrorLogin(true);
        return
    }

    try {
        await LoginModel.login(loginData as Login);
        console.log('sukses')
        setModal(true);
    } catch (error) {
        console.log("log: ", error);
        setLoginError('Anda gagal login. Cek kembali username dan password Anda.');
        setModalErrorLogin(true);
    }
};


export const handleRegister = async (
    id: number|undefined,
    username: string,
    password: string,
    confirmpassword: string,
    q1: string,
    q2: string,
    q3: string,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    setRegisError: React.Dispatch<React.SetStateAction<string>>,
    setModalErrorRegis: React.Dispatch<React.SetStateAction<boolean>>
) => {

    if (!id) {
        setRegisError('Id tidak Boleh Kosong');
        setModalErrorRegis(true);
        return
    }

    if (!username) {
        setRegisError('Username tidak boleh Kosong');
        setModalErrorRegis(true);
        return
    }

    if (!password) {
        setRegisError('Password tidak boleh Kosong');
        setModalErrorRegis(true);
        return
    }

    if (!confirmpassword) {
        setRegisError('Confirm Password tidak boleh Kosong');
        setModalErrorRegis(true);
        return
    }

    if (password !== confirmpassword) {
        setRegisError('Sama kan Password dengan Confirm Password nya ');
        setModalErrorRegis(true);
        return
    }
    const loginData: Login = {
        ID: id,
        Username: username,
        Password: password,
        token: '',
        Role: '',
        Q1: q1,
        Q2: q2,
        Q3: q3,
        Version: '',
        PC: '',
        Status: '',
        Input_Duration: ''
    };
    try {
        await LoginModel.register(loginData as Login);
        console.log('sukses')
        setModal(true);
    } catch (error) {
        console.log("log: ", error);
        setRegisError('Anda gagal Registrasi ulang dan Cek kembali username dan password Anda.');
        setModalErrorRegis(true);
    }
};
export const handleUpDurUserLogin = async (
    /* saya mengambil id,poin,dan hadiah hanya untuk memeriksa apakah id, poin, dan hadiah tersebut
    sudah memenuhi kondisi untuk dilakukan update last input dan input duration dari user, di 
    API sendiri tidak dibuat, jadi kondisi pure dibuat di front end */
    id: number | undefined,
    poin: number | undefined,
    loginUser: string,
    hadiah: number | undefined,
    inputDuration: string,
    setNotificationModal: React.Dispatch<React.SetStateAction<string>>,
    setModalType: React.Dispatch<React.SetStateAction<string>>,
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    if (id !== undefined && poin !== undefined && hadiah !== undefined) {
        const data = {
            Input_Duration: inputDuration,
        };
        try {
            const datai = await LoginModel.lastInput(loginUser, data);
            setModal(true);
            setModalType(`success-upduration`);
            setNotificationModal(`Durasi Input Kamu Telah Di catat, terimakasih`);
            console.log(datai)
        } catch (error) {
            setModal(true);
            setModalType(`error-upduration`);
            setNotificationModal(`Jenis Error: ${error}`);
        }
    } else {
        console.log(`ID: ${id}, Poin: ${poin}, Hadiah: ${hadiah} , Update duration batal di sektor user login`)
    }
}