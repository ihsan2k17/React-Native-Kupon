import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RouteProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../navigator/rootstack'
import { Poppins } from '../../components/constant/font'
import Color from '../../components/constant/color'
import FormEditHadiah from '../../components/hadiah/edithadiah/formedithadiah'
import { UpdateHadiah } from '../../service/fetchHadiah'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Modal from 'react-native-modal'
import { StackNavigationProp } from '@react-navigation/stack'
import NotificationEdit from '../../components/hadiah/modal/notificationedit'

interface edit {
    route: RouteProp<RootStackParamList, 'editHadiahPage'>;
}

const EditHadiah = ({ route }: edit) => {
    const { hadiahBarang } = route.params
    const [hadiah, setHadiah] = useState<number | undefined>();
    const [barang, setBarang] = useState('');
    const [periode, setPeriode] = useState<number>();
    const [jenis, setJenis] = useState('');
    const [notification, setNotification] = useState('');
    const [modal, setModal] = useState(false);
    const navigation = useNavigation <StackNavigationProp<RootStackParamList,'hadiahPage'>>()
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, alignItems: 'center' }}>
                <TouchableOpacity style={styles.TouchableBack} onPress={() => { navigation.goBack() }}>
                    <MaterialIcons name='arrow-back' size={24} color={Color.icon} />
                </TouchableOpacity>
                <Text style={styles.fontAddHadiah}>EDIT HADIAH</Text>
                <View style={{width:40, height:40}}></View>
            </View>
            <FormEditHadiah
                hadiah={hadiah} barang={barang} periode={periode} jenis={jenis}
                setHadiah={setHadiah} setBarang={setBarang} setPeriode={setPeriode} setJenis={setJenis} />
            <View style={{ paddingTop: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        if (hadiah !== undefined && periode !== undefined && barang && jenis) {
                            UpdateHadiah(hadiah,barang, periode, jenis, hadiahBarang, setNotification,setModal);
                        }
                    }}
                    style={{ padding: 5, paddingHorizontal: 30, alignItems: 'center', borderRadius: 10, backgroundColor: Color.border, }}
                >
                    <Text style={styles.fontModal}>Input</Text>
                </TouchableOpacity>
            </View>
            <Modal isVisible={modal}>
                <NotificationEdit notification={notification} setModal={setModal} />
            </Modal>
        </SafeAreaView>
    )
}

export default EditHadiah

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