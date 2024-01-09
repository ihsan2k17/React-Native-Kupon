import { View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, BackHandler } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '../../../components/constant/color';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Poppins } from '../../../components/constant/font';
import FormInputKuponNakami from '../../../components/kupon_nakami/inputkupon/forminputkuponnkm';
import StopwatchComponent from '../../../components/Stopwatch';
import { Login } from '../../../models/login';
import { cekuserLogin, handleUpDurUserLogin } from '../../../service/fetchLogin';
import { handleUpDurKuponNakami } from '../../../service/fetchKuponNakami';
import FormatTime from '../../../components/formattime';

const InputKuponNakami = () => {
    const navigation = useNavigation();
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(true);
    const [id, setId] = useState<number | undefined>();
    const [poin, setPoin] = useState<number | undefined>();
    const [hadiah, setHadiah] = useState<number | undefined>();
    const [namahadiah, setNamaHadiah] = useState('')
    const [kupon, setKupon] = useState<number | undefined>();
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
        console.log(`${user} {${elav}}`)
        await handleUpDurKuponNakami(id, poin, user, hadiah, elav, setNotificationModal, setModalType, setModal);
        await handleUpDurUserLogin(id, poin, user, hadiah, elav, setNotificationModal, setModalType, setModal);
    }
    const handleReset = () => {
        hanldeupDur()
        setElapsedTime(0);
        setIsRunning(false);
    };
    
    useEffect(() => {
        cekuserLogin(setDataUser, setNotificationModal);
    }, [])

    useFocusEffect(
        useCallback(() => {
            const BackPress = () => {
                hanldeupDur();
                setElapsedTime(0);
                setIsRunning(false);
                navigation.goBack()
                return true
            };

            BackHandler.addEventListener('hardwareBackPress', BackPress);

            return () => {
                BackHandler.removeEventListener('hardwareBackPress', BackPress);
            };
        }, [hanldeupDur, setElapsedTime, setIsRunning, navigation])
    )
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.icon, paddingHorizontal: 10}}>
            {/* HEADER */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop:10 }}>
                <View>
                    <TouchableOpacity style={styles.TouchableBack}
                        onPress={() => {
                            handleReset()
                            navigation.goBack()
                        }}
                    >
                        <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                    </TouchableOpacity>
                </View>
                <Text style={{fontSize:20, fontFamily:Poppins.Bold, color:Color.border}}>Input Kupon Nakami</Text>
                {/* DUMMY ICON UNTUK MEMBUAT SEBELAH KANAN NYA PERSISI DENGAN SEBELAH KIRI */}
                <View>
                    <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                </View>
            </View>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
                <View style={{alignItems:'center'}} >
                    <Image
                        source={require('../../../assets/images/onboarding1.png')}
                        resizeMode='contain'
                        style={{ height:150}}
                    />
                </View>
                <FormInputKuponNakami
                    id={id} setId={setId} poin={poin} setPoin={setPoin}
                    namahadiah={namahadiah} setNamahadiah={setNamaHadiah}
                    kupon={kupon} setKupon={setKupon} tahun={tahun} setTahun={setTahun}
                    hadiahke={hadiahke} setHadiahke={setHadiahke} hadiah={hadiah} setHadiah={setHadiah}
                    periode={periode} setPeriode={setPeriode} jenis={jenis} setJenis={setJenis}
                    modal={modal} setModal={setModal} notificationModal={notificationModal} 
                    setNotificationModal={setNotificationModal} modalType={modalType} setModalType={setModalType}
                />
                <StopwatchComponent elapsedTime={elapsedTime} setElapsedTime={setElapsedTime} isRunning={isRunning} setIsRunning={setIsRunning} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default InputKuponNakami
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