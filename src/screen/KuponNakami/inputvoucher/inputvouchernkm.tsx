import { View, Text, TouchableOpacity, StyleSheet, Image, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '../../../components/constant/color';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Poppins } from '../../../components/constant/font';
import FormInputVoucherNakami from '../../../components/kupon_nakami/inputvoucher/forminpoutvcrnkm';
import { Login } from '../../../models/login';
import FormatTime from '../../../components/formattime';
import { cekuserLogin, handleUpDurUserLogin } from '../../../service/fetchLogin';
import StopwatchComponent from '../../../components/Stopwatch';
import { handleUpDurKuponNakami } from '../../../service/fetchKuponNakami';
import Modal from 'react-native-modal';
import ModalUpduration from '../../../components/kupon/modalupduration';

const InputVoucherNakami = () => {
    const navigation = useNavigation();
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const [id, setId] = useState<number | undefined>();
    const [poin, setPoin] = useState<number | undefined>();
    const [hadiah, setHadiah] = useState<number | undefined>();
    const [namahadiah, setNamaHadiah] = useState('')
    const [voucher, setVoucher] = useState<number | undefined>();
    const [tahun, setTahun] = useState<number | undefined>();
    const [hadiahke, setHadiahke] = useState<number | undefined>();
    const [periode, setPeriode] = useState<number | undefined>();
    const [jenis, setJenis] = useState('');
    const [dataUser, setDataUser] = useState<Login | null>(null);
    const [notificationModal, setNotificationModal] = useState('');
    const [modalType, setModalType] = useState('');
    const [modal, setModal] = useState(false);

    const hanldeupDur = async () => {
        const user = dataUser?.Username ?? "";
        const elav = FormatTime(elapsedTime);
        console.log(`${user} {${elav}}`);
        await handleUpDurKuponNakami(id, poin, user, hadiah, elav, setNotificationModal, setModalType, setModal);
        await handleUpDurUserLogin(id, poin, user, hadiah, elav, setNotificationModal, setModalType, setModal);
        if (modalType === 'error-upduration') {
            navigation.goBack(); // Kembali ke halaman sebelumnya jika modalType adalah error
        } else if (modalType === 'success-upduration') {
            setModal(true); // Tampilkan modal jika modalType adalah success
        }
    }
    const handleReset = () => {
        hanldeupDur()
        setElapsedTime(0);
        setIsRunning(false);
    };

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                handleReset();
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );

    useEffect(() => {
        cekuserLogin(setDataUser, setNotificationModal);
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.icon, paddingHorizontal: 10 }}>
            {/* HEADER */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
                <View>
                    <TouchableOpacity style={styles.TouchableBack}
                        onPress={() => {handleReset()}}
                    >
                        <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontSize: 20, fontFamily: Poppins.Bold, color: Color.border }}>Input Voucher Nakami</Text>
                {/* DUMMY ICON UNTUK MEMBUAT SEBELAH KANAN NYA PERSISI DENGAN SEBELAH KIRI */}
                <View>
                    <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                </View>
            </View>
            <View>
                <View style={{ alignItems: 'center' }} >
                    <Image
                        source={require('../../../assets/images/onboarding1.png')}
                        resizeMode='contain'
                        style={{ height: 220 }}
                    />
                </View>
                <FormInputVoucherNakami
                    id={id} setId={setId} poin={poin} setPoin={setPoin} namahadiah={namahadiah} setNamahadiah={setNamaHadiah}
                    voucher={voucher} setVoucher={setVoucher} tahun={tahun} setTahun={setTahun}
                    hadiahke={hadiahke} setHadiahke={setHadiahke} hadiah={hadiah} setHadiah={setHadiah} periode={periode}
                    setPeriode={setPeriode} jenis={jenis} setJenis={setJenis} modal={modal} setModal={setModal}
                    notificationModal={notificationModal} setNotificationModal={setNotificationModal} modalType={modalType}
                    setModalType={setModalType} />
                <StopwatchComponent
                    elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} isRunning={isRunning} setIsRunning={setIsRunning} />
            </View>
            <Modal isVisible={modal}>
                <ModalUpduration setModal={setModal} notificationModal={notificationModal} />
            </Modal>
        </SafeAreaView>
    )
}

export default InputVoucherNakami
const styles = StyleSheet.create({
    TouchableBack: {
        backgroundColor: Color.border,
        borderRadius: 15,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})