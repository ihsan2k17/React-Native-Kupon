import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigator/rootstack';
import { RouteProp, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NotificationEditHadiahNakami from '../../components/hadiah_nakami/modal/notificationeditNKM';
import Modal from 'react-native-modal';
import FormEditHadiahNakami from '../../components/hadiah_nakami/edithadiah/formedithadiahNKM';
import Color from '../../components/constant/color';
import { Poppins } from '../../components/constant/font';
import { UpdateHadiahNKM } from '../../service/fetchHadiahNakami';

interface edit {
    route: RouteProp<RootStackParamList, 'editHadiahNakamiPage'>;
}

const EditHadiahNakami = ({route}:edit) => {
    const { hadiahNakamiBarang } = route.params
    const [hadiah, setHadiah] = useState<number | undefined>();
    const [barang, setBarang] = useState('');
    const [periode, setPeriode] = useState<number>();
    const [jenis, setJenis] = useState('');
    const [notification, setNotification] = useState('');
    const [modal, setModal] = useState(false);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'hadiahNakamiPage'>>()
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, alignItems: 'center' }}>
                <TouchableOpacity style={styles.TouchableBack} onPress={() => { navigation.goBack() }}>
                    <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                </TouchableOpacity>
                <Text style={styles.fontAddHadiah}>EDIT HADIAH NAKAMI</Text>
                <View style={{ width: 40, height: 40 }}></View>
            </View>
            <FormEditHadiahNakami
                hadiah={hadiah} barang={barang} periode={periode} jenis={jenis}
                setHadiah={setHadiah} setBarang={setBarang} setPeriode={setPeriode} setJenis={setJenis} />
            <View style={{ paddingTop: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        if (hadiah !== undefined && periode !== undefined && barang && jenis) {
                            UpdateHadiahNKM(hadiah, barang, periode, jenis, hadiahNakamiBarang, setNotification, setModal);
                        }
                    }}
                    style={{ padding: 5, paddingHorizontal: 30, alignItems: 'center', borderRadius: 10, backgroundColor: Color.border, }}
                >
                    <Text style={styles.fontModal}>Input</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={modal}>
                <NotificationEditHadiahNakami notification={notification} setModal={setModal} />
            </Modal>
        </SafeAreaView>
    )
}

export default EditHadiahNakami

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.icon,
        paddingHorizontal: 10
    },
    fontAddHadiah: {
        fontSize: 19,
        fontFamily: Poppins.Black,
        color: Color.border
    },
    fontModal: {
        fontSize: 19,
        fontFamily: Poppins.Black,
        color: Color.icon
    },
    TouchableBack: {
        backgroundColor: Color.border,
        borderRadius: 15,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
})