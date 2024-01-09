import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigator/rootstack';
import FormEditKupon from '../../../components/kupon/editdeletekupon/formeditKupon';
import { SafeAreaView } from 'react-native-safe-area-context';
import Color from '../../../components/constant/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { Poppins } from '../../../components/constant/font';
import { handleUpdateKupon } from '../../../service/fetchKupon';
import Modal from 'react-native-modal';
import { ModalErrorEditkupon, ModalSuccessEditKupon } from '../../../components/kupon/modalnotifedit';
interface editKuponProps {
    route: RouteProp<RootStackParamList, 'EditKupon'>;
}
const EditKupon = ({route}:editKuponProps) => {
    const { kuponId } = route.params;
    const { kuponPoin } = route.params;
    const { kuponKupon } = route.params;
    const [kupon, setKupon] = useState<number | undefined>();
    const [hadiah, setHadiah] = useState<number | undefined>();
    const [hadiahke, setHadiahke] = useState<number | undefined>();
    const [namahadiah, setNamahadiah] = useState('');
    const [tahun, setTahun] = useState<number | undefined>();
    const [periode, setPeriode] = useState<number | undefined>();
    const [modal, setModal] = useState(false);
    const [notificationModal, setNotificationModal] = useState('');
    const [modalType, setModalType] = useState('')
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'DetailKuponPage'>>()
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.TouchableBack}
                            onPress={() => { navigation.goBack() }}>
                            <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                        </TouchableOpacity>
                        <Text style={styles.fontAddHadiah}>EDIT KUPON</Text>
                        <View style={{ width: 40, height: 40 }}></View>
                    </View>
                    <View style={{ alignItems: 'center' }} >
                        <Image
                            source={require('../../../assets/images/onboarding3.png')}
                            resizeMode='contain'
                            style={{ height: 220 }}
                        />
                    </View>
                    <FormEditKupon
                        kupon={kupon} setKupon={setKupon}
                        tahun={tahun} setTahun={setTahun}
                        hadiah={hadiah} setHadiah={setHadiah}
                        hadiahke={hadiahke} setHadiahke={setHadiahke}
                        namahadiah={namahadiah} setNamahadiah={setNamahadiah}
                        periode={periode} setPeriode={setPeriode}
                        setModal={setModal} setNotificationModal={setNotificationModal}
                    />
                    <View style={styles.containerButtonEdit}>
                        <TouchableOpacity
                            style={styles.buttonEdit}
                            onPress={() => {
                                handleUpdateKupon(
                                    kupon, hadiah, namahadiah, hadiahke, tahun, periode,
                                    kuponId, kuponPoin, kuponKupon, setNotificationModal, setModalType,setModal)
                            }}
                        >
                            <Text style={{ fontSize: 18, fontFamily: Poppins.Black, color: Color.icon }}>EDIT</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal isVisible={modal}>
                        {modalType === `success-update-kupon` && ModalSuccessEditKupon({ notificationModal, setModalType, setModal })}
                        {modalType === `error-update-kupon` && ModalErrorEditkupon({ notificationModal, setModalType, setModal })}
                    </Modal>
                </View>
            </SafeAreaView>
    )
}

export default EditKupon

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.icon,
        paddingHorizontal: 10
    },
    TouchableBack: {
        backgroundColor: Color.border,
        borderRadius: 15,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fontAddHadiah: {
        fontSize: 19,
        fontFamily: Poppins.Black,
        color: Color.border
    },
    containerButtonEdit: {
        paddingHorizontal: 100, paddingVertical: 10
    },
    buttonEdit: {
        padding: 5, paddingHorizontal: 30, alignItems: 'center', borderRadius: 10, backgroundColor: Color.border
    }
})